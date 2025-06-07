export interface User {
  fullName: string;
  email: string;
  adharNumber: string;
  contactNumber: string;
  dateOfBirth: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  birthday: string;
  adharNumber: string;
}

export interface VaccineRecord {
  id: string;
  vaccineName: string;
  date: string;
  familyMember: string;
  proofUrl: string;
}

export interface UpcomingVaccination {
  id: string;
  vaccineName: string;
  date: string;
  familyMember: string;
  healthcareCenter: string;
  status: string;
}

export interface HealthcareCenter {
  id: string;
  name: string;
  address: string;
}

export interface Booth {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
}

export interface BookingRequest {
  id: string;
  vaccineName: string;
  date: string;
  patientName: string;
  status: 'pending' | 'approved' | 'completed';
}