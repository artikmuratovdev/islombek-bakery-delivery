import { UserResponse } from "../../../app/api/auth-api/types";

export interface Props {
  drivers?: { user: UserResponse; lat: number; lng: number; rot: number }[];
  setLocation?: (value: {
    user: UserResponse;
    lat: number;
    lng: number;
    rot: number;
  }) => void;
}

export interface TileLayerControlProps {
  drivers?: Props["drivers"];
  position: [number, number];
  hybridTile: boolean;
  setHybridTile: (value: boolean) => void;
}
