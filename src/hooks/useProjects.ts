import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Project, projects as initialProjects } from '@/data/projects';

const STORAGE_KEY = 'gantt-projects';
const VERSION_KEY = 'gantt-projects-version';
const CURRENT_VERSION = '5'; // Increment for Supabase migration

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [useSupabase, setUseSupabase] = useState(false);

  // Check if Supabase is configured
  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    setUseSupabase(!!supabaseUrl && !!supabaseKey && 
                   supabaseUrl !== 'YOUR_SUPABASE_URL' && 
                   supabaseKey !== 'YOUR_SUPABASE_ANON_KEY');
  }, []);

  // Load projects from Supabase or localStorage
  useEffect(() => {
    loadProjects();
  }, [useSupabase]);

  // Subscribe to real-time changes
  useEffect(() => {
    if (!useSupabase) return;

    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          loadProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [useSupabase]);

  const loadProjects = async () => {
    try {
      if (useSupabase) {
        // Load from Supabase
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('department', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          // Convert snake_case to camelCase
          const formattedProjects = data.map(p => ({
            id: p.id,
            name: p.name,
            risk: p.risk,
            status: p.status,
            owner: p.owner,
            progress: p.progress,
            dueDate: p.due_date,
            duration: p.duration,
            department: p.department,
            description: p.description
          })) as Project[];
          setProjects(formattedProjects);
        } else {
          // Initialize with default data if empty
          await initializeSupabaseData();
        }
      } else {
        // Load from localStorage
        const storedVersion = localStorage.getItem(VERSION_KEY);
        const storedProjects = localStorage.getItem(STORAGE_KEY);

        if (storedVersion === CURRENT_VERSION && storedProjects) {
          setProjects(JSON.parse(storedProjects));
        } else {
          localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
          setProjects(initialProjects);
        }
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback to localStorage
      const storedProjects = localStorage.getItem(STORAGE_KEY);
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        setProjects(initialProjects);
      }
    } finally {
      setLoading(false);
    }
  };

  const initializeSupabaseData = async () => {
    try {
      // Convert camelCase to snake_case for Supabase
      const dataToInsert = initialProjects.map(p => ({
        id: p.id,
        name: p.name,
        risk: p.risk,
        status: p.status,
        owner: p.owner,
        progress: p.progress,
        due_date: p.dueDate,
        duration: p.duration,
        department: p.department,
        description: p.description || null
      }));

      const { error } = await supabase
        .from('projects')
        .insert(dataToInsert);

      if (error) throw error;
      
      await loadProjects();
    } catch (error) {
      console.error('Error initializing Supabase data:', error);
    }
  };

  const saveProjects = async (updatedProjects: Project[]) => {
    try {
      if (useSupabase) {
        // Supabase updates are handled individually by add/update/delete functions
        setProjects(updatedProjects);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
        setProjects(updatedProjects);
      }
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  };

  const addProject = async (project: Project) => {
    try {
      if (useSupabase) {
        const { error } = await supabase
          .from('projects')
          .insert({
            id: project.id,
            name: project.name,
            risk: project.risk,
            status: project.status,
            owner: project.owner,
            progress: project.progress,
            due_date: project.dueDate,
            duration: project.duration,
            department: project.department,
            description: project.description || null
          });

        if (error) throw error;
      } else {
        const updatedProjects = [...projects, project];
        await saveProjects(updatedProjects);
      }
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  };

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    try {
      if (useSupabase) {
        const updateData: any = {};
        if (updates.name !== undefined) updateData.name = updates.name;
        if (updates.owner !== undefined) updateData.owner = updates.owner;
        if (updates.status !== undefined) updateData.status = updates.status;
        if (updates.progress !== undefined) updateData.progress = updates.progress;
        if (updates.dueDate !== undefined) updateData.due_date = updates.dueDate;
        if (updates.duration !== undefined) updateData.duration = updates.duration;
        if (updates.department !== undefined) updateData.department = updates.department;
        if (updates.description !== undefined) updateData.description = updates.description;

        const { error } = await supabase
          .from('projects')
          .update(updateData)
          .eq('id', projectId);

        if (error) throw error;
      } else {
        const updatedProjects = projects.map(p =>
          p.id === projectId ? { ...p, ...updates } : p
        );
        await saveProjects(updatedProjects);
      }
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      if (useSupabase) {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', projectId);

        if (error) throw error;
      } else {
        const updatedProjects = projects.filter(p => p.id !== projectId);
        await saveProjects(updatedProjects);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  return {
    projects,
    loading,
    useSupabase,
    addProject,
    updateProject,
    deleteProject,
    refreshProjects: loadProjects
  };
}

