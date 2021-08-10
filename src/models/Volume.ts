export interface Volume {
  timestamp: Date,
  volume: number,
  spotVolume: number,
  derivativeVolume: number,
};

export interface VolumeRequestPayload {
  start_at: Date,
  end_at: Date|null
};

export interface VolumesActionResponse {
  result: Array<Volume>|null,
  message: string|null,
};