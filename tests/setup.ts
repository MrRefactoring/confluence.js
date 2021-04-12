import * as dotenv from 'dotenv';
import { TelemetryClient } from 'telemetry.confluence.js';

dotenv.config();

TelemetryClient.prototype.sendTelemetry = () => Promise.resolve();
