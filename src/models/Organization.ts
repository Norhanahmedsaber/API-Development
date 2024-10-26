import mongoose, { Schema, Document } from 'mongoose';

interface OrganizationMember {
  name: string;
  email: string;
  access_level: string;
}

interface Organization extends Document {
  name: string;
  description: string;
  organization_members: OrganizationMember[];
}

const OrganizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  organization_members: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      access_level: { type: String, required: true, enum: ['read', 'write'] },
    },
  ],
});

export default mongoose.model<Organization>('Organization', OrganizationSchema);
