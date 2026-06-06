import mongoose from 'mongoose';

const InviteSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    templateId: {
      type: String,
      required: true,
      enum: ['minimalist-wedding', 'neon-mixer', 'corporate-gala'],
    },
    title: {
      type: String,
      required: true,
    },
    hostName: {
      type: String,
      default: '',
    },
    eventDate: {
      type: String,
      default: '',
    },
    eventTime: {
      type: String,
      default: '',
    },
    locationName: {
      type: String,
      default: '',
    },
    locationAddress: {
      type: String,
      default: '',
    },
    dressCode: {
      type: String,
      default: '',
    },
    rsvpDeadline: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    customFields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Invite || mongoose.model('Invite', InviteSchema);
