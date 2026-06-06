import mongoose from 'mongoose';

const RsvpSchema = new mongoose.Schema(
  {
    inviteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invite',
      required: true,
    },
    guestName: {
      type: String,
      required: [true, 'Please provide your name.'],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['attending', 'declined'],
    },
    guestCount: {
      type: Number,
      default: 1,
      min: 1,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Rsvp || mongoose.model('Rsvp', RsvpSchema);
