export type ProjectStatus = 
  | 'Planning'
  | 'Backlog'
  | 'In Progress'
  | 'Testing'
  | 'On Hold'
  | 'Completed';

export type ClientDepartment = 'Operations' | 'Finance' | 'Workshop' | 'Mexico Operations' | 'Human Resources' | 'Safety';

export interface Project {
  id: string;
  name: string;
  risk: 'Low Risk' | 'Med Risk' | 'High Risk' | 'On Track';
  status: ProjectStatus;
  owner: string;
  progress: number;
  dueDate: string;
  duration: number;
  department: 'Software Development' | 'Business Intelligence' | 'Robotic Process Automation';
  clientDepartment?: ClientDepartment;
  description?: string;
}

export const projects: Project[] = [
  {
    id: 'bi-1',
    name: 'Status Trailers YMS John Deere',
    risk: 'Med Risk',
    status: 'In Progress',
    owner: 'Andres Huguet',
    progress: 25,
    dueDate: '11/9/2025',
    duration: 45,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-2',
    name: 'Resolve Rejected Loads',
    risk: 'High Risk',
    status: 'In Progress',
    owner: 'Andres Huguet',
    progress: 10,
    dueDate: '11/24/2025',
    duration: 100,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-3',
    name: 'Facturacion MX',
    risk: 'Low Risk',
    status: 'Backlog',
    owner: 'Andres Huguet',
    progress: 0,
    dueDate: '11/21/2025',
    duration: 7,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-4',
    name: 'Evaluacion Planning',
    risk: 'Med Risk',
    status: 'Backlog',
    owner: 'Andres Huguet',
    progress: 0,
    dueDate: '11/20/2025',
    duration: 6,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-5',
    name: 'Evaluacion Despachos NLD',
    risk: 'Med Risk',
    status: 'Backlog',
    owner: 'Andres Huguet',
    progress: 0,
    dueDate: '11/23/2025',
    duration: 9,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-6',
    name: 'Investigacion Historico detenidas',
    risk: 'High Risk',
    status: 'In Progress',
    owner: 'Alan Saucedo',
    progress: 35,
    dueDate: '11/4/2025',
    duration: 20,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-7',
    name: 'Truck kardex',
    risk: 'Med Risk',
    status: 'In Progress',
    owner: 'Miguel Loera',
    progress: 80,
    dueDate: '10/23/2025',
    duration: 70,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-8',
    name: 'Workshop Fault System',
    risk: 'High Risk',
    status: 'In Progress',
    owner: 'Miguel Loera',
    progress: 20,
    dueDate: '10/27/2025',
    duration: 14,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-9',
    name: "Control Trucks-DM's (Suport)",
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Miguel Loera',
    progress: 10,
    dueDate: '10/29/2025',
    duration: 15,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-10',
    name: 'JIRA - Solicitud de gastos de viaticos',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Andrea Lopez',
    progress: 80,
    dueDate: '10/24/2025',
    duration: 46,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-11',
    name: 'Sistema ETL de Recursos Humanos',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Andrea Lopez',
    progress: 95,
    dueDate: '10/17/2025',
    duration: 184,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-12',
    name: 'Pre-nomina app',
    risk: 'High Risk',
    status: 'In Progress',
    owner: 'Andrea Lopez',
    progress: 5,
    dueDate: '12/9/2025',
    duration: 90,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-13',
    name: 'Indicadores RH 2.0',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Andrea Lopez',
    progress: 0,
    dueDate: '11/10/2025',
    duration: 14,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-14',
    name: 'Reporte semanal fusion',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Andrea Lopez',
    progress: 0,
    dueDate: '10/27/2025',
    duration: 0,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-15',
    name: 'Health Check EDI Services',
    risk: 'Med Risk',
    status: 'In Progress',
    owner: 'Martin Martinez',
    progress: 75,
    dueDate: '10/24/2025',
    duration: 15,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-16',
    name: 'Health Check EDI Integratios Tracking',
    risk: 'Med Risk',
    status: 'In Progress',
    owner: 'Martin Martinez',
    progress: 50,
    dueDate: '11/6/2025',
    duration: 10,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-17',
    name: 'Herramienta de configuracion de clientes',
    risk: 'Med Risk',
    status: 'In Progress',
    owner: 'Martin Martinez',
    progress: 0,
    dueDate: '11/16/2025',
    duration: 20,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-18',
    name: 'Sistema de Administracion de Dashboards',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Martin Martinez',
    progress: 45,
    dueDate: '10/20/2025',
    duration: 10,
    department: 'Business Intelligence'
  },
  {
    id: 'bi-19',
    name: 'Modulos de manejo vacias dentro de TMS',
    risk: 'High Risk',
    status: 'In Progress',
    owner: 'Alan Saucedo',
    progress: 20,
    dueDate: '12/16/2025',
    duration: 60,
    department: 'Business Intelligence'
  },
  // Software Development Projects
  {
    id: 'sd-1',
    name: 'Ticket Support',
    risk: 'Med Risk',
    status: 'In Progress',
    owner: 'Cipriano Espinoza',
    progress: 40,
    dueDate: '11/22/2025',
    duration: 138,
    department: 'Software Development'
  },
  {
    id: 'sd-2',
    name: 'Bugs',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Cipriano Espinoza',
    progress: 30,
    dueDate: '12/31/2025',
    duration: 177,
    department: 'Software Development'
  },
  {
    id: 'sd-3',
    name: 'Driver Manager new features Development',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Fernando Hernandez',
    progress: 50,
    dueDate: '10/1/2025',
    duration: 60,
    department: 'Software Development'
  },
  {
    id: 'sd-4',
    name: 'TMS Force One',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Daniel Garza',
    progress: 30,
    dueDate: '12/15/2025',
    duration: 135,
    department: 'Software Development'
  },
  {
    id: 'sd-5',
    name: 'TMS Logistica',
    risk: 'On Track',
    status: 'Planning',
    owner: 'Daniel Garza',
    progress: 10,
    dueDate: '1/15/2026',
    duration: 33,
    department: 'Software Development'
  },
  {
    id: 'sd-6',
    name: 'Capacitacion de TMS ForzaCore a CdE',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Adalberto Roque',
    progress: 20,
    dueDate: '11/15/2025',
    duration: 33,
    department: 'Software Development'
  },
  {
    id: 'sd-7',
    name: 'Workshop Management System - Development',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Fernando Hernandez',
    progress: 50,
    dueDate: '12/31/2025',
    duration: 151,
    department: 'Software Development'
  },
  {
    id: 'sd-8',
    name: 'Workshop Management System - QA',
    risk: 'Med Risk',
    status: 'Planning',
    owner: 'Daniel M Garcia',
    progress: 0,
    dueDate: '7/12/2025',
    duration: 22,
    department: 'Software Development'
  },
  {
    id: 'sd-9',
    name: '210 Colgate',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Daniel Sanchez',
    progress: 60,
    dueDate: '10/31/2025',
    duration: 46,
    department: 'Software Development'
  },
  {
    id: 'sd-10',
    name: 'Geotab Onpremise DB Migration to Claude',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Daniel Sanchez',
    progress: 30,
    dueDate: '10/31/2025',
    duration: 9,
    department: 'Software Development'
  },
  {
    id: 'sd-11',
    name: 'AI Agents (email & Voice)',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Daniel Sanchez',
    progress: 0,
    dueDate: '9/30/2025',
    duration: 264,
    department: 'Software Development'
  },
  {
    id: 'sd-12',
    name: 'EDI Healthcheck',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Alexander Morales',
    progress: 60,
    dueDate: '11/23/2025',
    duration: 74,
    department: 'Software Development'
  },
  {
    id: 'sd-13',
    name: 'EDI - OPS Sentinel',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Daniel Sanchez',
    progress: 80,
    dueDate: '11/23/2025',
    duration: 74,
    department: 'Software Development'
  },
  {
    id: 'sd-14',
    name: 'Westrock 204&214 to UberFreight',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Daniel Sanchez',
    progress: 10,
    dueDate: '10/31/2025',
    duration: 143,
    department: 'Software Development'
  },
  {
    id: 'sd-15',
    name: 'Kohler 204&214 to UberFreight',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Daniel Sanchez',
    progress: 60,
    dueDate: '10/31/2025',
    duration: 13,
    department: 'Software Development'
  },
  {
    id: 'sd-16',
    name: 'EDI 210 Lear',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Daniel Sanchez',
    progress: 50,
    dueDate: '11/15/2025',
    duration: 309,
    department: 'Software Development'
  },
  {
    id: 'sd-17',
    name: 'Daimler (210) - Castport',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Alexander Morales',
    progress: 10,
    dueDate: '11/30/2025',
    duration: 324,
    department: 'Software Development'
  },
  {
    id: 'sd-18',
    name: 'Black and Decker (210) - Castport',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Alexander Morales',
    progress: 60,
    dueDate: '11/30/2025',
    duration: 324,
    department: 'Software Development'
  },
  {
    id: 'sd-19',
    name: 'Nestle (210) - Castport',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Alexander Morales',
    progress: 20,
    dueDate: '11/30/2025',
    duration: 324,
    department: 'Software Development'
  },
  {
    id: 'sd-20',
    name: 'RPA Preloads Creation',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Daniel Sanchez',
    progress: 90,
    dueDate: '10/31/2025',
    duration: 143,
    department: 'Software Development'
  },
  {
    id: 'sd-21',
    name: 'Caterpillar Shippeo (214)',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Daniel Sanchez',
    progress: 70,
    dueDate: '10/31/2025',
    duration: 46,
    department: 'Software Development'
  },
  {
    id: 'sd-22',
    name: 'AS2 Gateway to MFG Gateway',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Alexander Morales',
    progress: 20,
    dueDate: '6/11/2025',
    duration: 1,
    department: 'Software Development'
  },
  {
    id: 'sd-23',
    name: 'Driver App (MVP)',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-24',
    name: 'Intercambios',
    risk: 'Med Risk',
    status: 'In Progress',
    owner: 'Manuel Serrano',
    progress: 50,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-25',
    name: 'Intercambios 360 (MVP)',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-26',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-27',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-28',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-29',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-30',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-31',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-32',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-33',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-34',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-35',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-36',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-37',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-38',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-39',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'In Progress',
    owner: 'Paola Ruiz',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 302,
    department: 'Software Development'
  },
  {
    id: 'sd-40',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-41',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-42',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-43',
    name: 'Intercambios 360 - Integracion con Geotab',
    risk: 'Low Risk',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-44',
    name: 'Venta de Viajes (GERRY)',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-45',
    name: 'MKP (Varios)',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-46',
    name: 'Modulo Accidentes',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-47',
    name: 'Road Service',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-48',
    name: 'IFTA integration',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-49',
    name: 'Sistema Almacen',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-50',
    name: 'Truck Assignment',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-51',
    name: 'Torre Control',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-52',
    name: 'Gipsy',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-53',
    name: 'Modulo reglas EDI',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-54',
    name: 'Plataforma Truck Faults Sytem',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  {
    id: 'sd-55',
    name: 'Indicadores de TMS',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Backlog',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Software Development'
  },
  // Robotic Process Automation Projects - COMERCIAL
  {
    id: 'rpa-1',
    name: 'Data Entry Assistant - Increment: Preloads Terraquip',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Alexis Oropeza',
    progress: 80,
    dueDate: '10/18/2025',
    duration: 12,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-2',
    name: 'Data Entry Assistant - Rate Confirmation: CSR & ADP',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Alexis Oropeza',
    progress: 50,
    dueDate: '10/17/2025',
    duration: 3,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-3',
    name: 'Data Entry Assistant - BOLs / Commodities Goodyear',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Alexis Oropeza',
    progress: 50,
    dueDate: '10/17/2025',
    duration: 4,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-4',
    name: 'Data Entry Assistant - BOLs / Commodities Pepsi',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Alexis Oropeza',
    progress: 50,
    dueDate: '10/17/2025',
    duration: 4,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-5',
    name: 'Data Entry Assistant - BOLs / Commodities Navstar',
    risk: 'On Track',
    status: 'Planning',
    owner: 'Alexis Oropeza',
    progress: 20,
    dueDate: '10/24/2025',
    duration: 11,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-6',
    name: 'Data Entry Assistant - BOLs / Commodities Alpha Omega',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Alexis Oropeza',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 4,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-7',
    name: 'Data Entry Assistant - Rate Confirmation: CSR & ADP',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Alexis Oropeza',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 4,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-8',
    name: 'CSR - Tender Reports OTM',
    risk: 'On Track',
    status: 'Planning',
    owner: 'Julian Macias',
    progress: 20,
    dueDate: '10/27/2025',
    duration: 11,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-9',
    name: 'CSR - EDI& OTM Report to TMS Fare',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Julian Macias',
    progress: 0,
    dueDate: '11/7/2025',
    duration: 11,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-10',
    name: 'CSR - Increment: Invoicing Validation Files Audit',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Manuel',
    progress: 50,
    dueDate: '10/24/2025',
    duration: 18,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-11',
    name: 'CSR - Crossing Control Carranza VW',
    risk: 'On Track',
    status: 'Planning',
    owner: 'Manuel',
    progress: 20,
    dueDate: '10/24/2025',
    duration: 4,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-12',
    name: 'CSR - Carta Porte Upload VW',
    risk: 'On Track',
    status: 'Planning',
    owner: 'Manuel',
    progress: 20,
    dueDate: '10/24/2025',
    duration: 4,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-13',
    name: 'CSR - Crossing VW',
    risk: 'On Track',
    status: 'Planning',
    owner: 'Manuel',
    progress: 20,
    dueDate: '10/24/2025',
    duration: 4,
    department: 'Robotic Process Automation'
  },
  // Robotic Process Automation Projects - FINANCE
  {
    id: 'rpa-14',
    name: 'Accounts Receivable - P&G Report to MX Update',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Omar Soto',
    progress: 50,
    dueDate: '10/10/2025',
    duration: 11,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-15',
    name: 'Accounts Receivable Castport Report',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Omar Soto',
    progress: 0,
    dueDate: '10/24/2025',
    duration: 8,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-16',
    name: 'Accounts Receivable Data2 Logistics Report',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Omar Soto',
    progress: 0,
    dueDate: '10/31/2025',
    duration: 4,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-17',
    name: 'Purchase - PO: Approvals Flow',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Hugo Audiano',
    progress: 50,
    dueDate: '10/17/2025',
    duration: 3,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-18',
    name: 'Purchase - PODs MX Validation',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Hugo Audiano',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-19',
    name: 'Accounts Payable - Tolls USA',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Hugo Audiano',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-20',
    name: 'Accounts Payable - Tolls MX',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Hugo Audiano',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-21',
    name: 'Carriers MX Invoices Report',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Hugo Audiano',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-22',
    name: 'Force One Invoices',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Hugo Audiano',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Robotic Process Automation'
  },
  // Robotic Process Automation Projects - SAFETY
  {
    id: 'rpa-23',
    name: 'Trucks - Increment: Drivers Backup Info & Documents',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Moises Alvarado',
    progress: 50,
    dueDate: '10/14/2025',
    duration: 8,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-24',
    name: 'Trucks - Increment: Drivers Backup Info & Documents',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Moises Alvarado',
    progress: 50,
    dueDate: '10/17/2025',
    duration: 4,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-25',
    name: 'Trucks - Increment: Drivers Backup Info & Documents',
    risk: 'On Track',
    status: 'Planning',
    owner: 'Moises Alvarado',
    progress: 20,
    dueDate: '10/24/2025',
    duration: 4,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-26',
    name: 'Trucks - Increment: Update Info',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Moises Alvarado',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Robotic Process Automation'
  },
  // Robotic Process Automation Projects - MAINTENANCE
  {
    id: 'rpa-27',
    name: 'Maintenance - Risk Areas Landmark Alerts Geotab',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Julian Macias',
    progress: 50,
    dueDate: '10/10/2025',
    duration: 7,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-28',
    name: 'Maintenance - Maintenance: Trucks Reset Lysis and Mast Report DT',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Moises Alvarado',
    progress: 50,
    dueDate: '10/10/2025',
    duration: 7,
    department: 'Robotic Process Automation'
  },
  // Robotic Process Automation Projects - OPERATIONS MND
  {
    id: 'rpa-29',
    name: 'Data Entry Assistant - Transfers Manifest',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Rafael Bravo',
    progress: 50,
    dueDate: '10/9/2025',
    duration: 10,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-30',
    name: 'Data Entry Assistant - Maintenance Manifest Creation Presto',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Rafael Bravo',
    progress: 50,
    dueDate: '10/10/2025',
    duration: 7,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-31',
    name: 'Data Entry Assistant - ENTRY Kohler Reading / Manifest Creation',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Rafael Bravo',
    progress: 50,
    dueDate: '10/10/2025',
    duration: 7,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-32',
    name: 'Data Entry Assistant - ENTRY Goodyear Reading / Manifest Creation',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Rafael Bravo',
    progress: 50,
    dueDate: '10/24/2025',
    duration: 8,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-33',
    name: 'Data Entry Assistant - ENTRY Colgate Reading / Manifest Creation',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Rafael Bravo',
    progress: 50,
    dueDate: '10/24/2025',
    duration: 8,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-34',
    name: 'Data Entry Assistant - ENTRY Caterpillar Reading / Manifest Creation',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Rafael Bravo',
    progress: 50,
    dueDate: '10/24/2025',
    duration: 8,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-35',
    name: 'Data Entry Assistant - ENTRY Caterpillar Reading / Manifest Creation',
    risk: 'On Track',
    status: 'In Progress',
    owner: 'Rafael Bravo',
    progress: 50,
    dueDate: '10/31/2025',
    duration: 4,
    department: 'Robotic Process Automation'
  },
  {
    id: 'rpa-36',
    name: 'Data Entry Assistant - DGDM Modulation',
    risk: 'On Track',
    status: 'Backlog',
    owner: 'Rafael Bravo',
    progress: 0,
    dueDate: '12/31/2025',
    duration: 0,
    department: 'Robotic Process Automation'
  }
];

