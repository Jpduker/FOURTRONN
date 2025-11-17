// Add service ticket types to existing types

export interface ServiceTicket {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  productCategory: ProductCategory;
  productName?: string;
  serviceType: 'maintenance' | 'complaint' | 'troubleshooting';
  preferredDate: string;
  preferredTime: string;
  address: string;
  city: string;
  pincode: string;
  comments?: string;
  status: ServiceTicketStatus;
  createdAt: string;
  updatedAt?: string;
}

export type ServiceTicketStatus = 'pending' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
