import React from 'react';
import StreamingVideo from '@/components/StreamingVideo';
import cctv from '../proto/cctv_grpc_web_pb';

function MonitoringPage() {
  const MONITORING_GRPC_WEB_API_URL = import.meta.env.VITE_MONITORING_GRPC_WEB_API_URL;
  const client = new cctv.MonitoringClient(MONITORING_GRPC_WEB_API_URL, null, null);
  const emptyRequest = new cctv.Empty();

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Monitoring</h1>
      </div>
      <StreamingVideo client={client} request={emptyRequest} />
    </div>
  );
}

export default MonitoringPage;
