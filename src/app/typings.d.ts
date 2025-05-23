declare class NDEFReader {
  scan(): Promise<void>;
  write(message: string | NDEFMessageInit): Promise<void>;
  onreading: (event: any) => void;
  onreadingerror: (event: any) => void;
}
