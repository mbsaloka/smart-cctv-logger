import React, { useState, useEffect } from 'react';
import StreamingVideo from '@/components/StreamingVideo';
import cctv from '../proto/cctv_grpc_web_pb';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Fullscreen, Minimize, Users } from 'lucide-react';

function MonitoringPage() {
  const MONITORING_GRPC_WEB_API_URL = import.meta.env.VITE_MONITORING_GRPC_WEB_API_URL;
  const client = new cctv.MonitoringClient(MONITORING_GRPC_WEB_API_URL, null, null);
  const emptyRequest = new cctv.Empty();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [cameraSettings, setCameraSettings] = useState({
    brightness: 50,
    contrast: 50,
    saturation: 50,
  });
  const [peopleDetected, setPeopleDetected] = useState(0);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const handleSettingChange = (setting, value) => {
    setCameraSettings(prev => ({ ...prev, [setting]: value }));
    // Here you would typically send the new settings to your backend
    console.log(`Setting ${setting} changed to ${value}`);
  };

  useEffect(() => {
    // Simulating people detection
    const interval = setInterval(() => {
      setPeopleDetected(Math.floor(Math.random() * 10));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">CCTV Monitoring</h1>
        <Button variant="outline" onClick={toggleFullScreen}>
          {isFullScreen ? (
            <>
              <Minimize className="mr-2 h-4 w-4" />
              Exit Full Screen
            </>
          ) : (
            <>
              <Fullscreen className="mr-2 h-4 w-4" />
              Full Screen
            </>
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Time: {new Date().toLocaleTimeString()}</p>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <p>People Detected: {peopleDetected}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Camera Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="brightness" className="text-sm font-medium">
                  Brightness: {cameraSettings.brightness}
                </label>
                <Slider
                  id="brightness"
                  min={0}
                  max={100}
                  step={1}
                  value={[cameraSettings.brightness]}
                  onValueChange={(value) => handleSettingChange('brightness', value[0])}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contrast" className="text-sm font-medium">
                  Contrast: {cameraSettings.contrast}
                </label>
                <Slider
                  id="contrast"
                  min={0}
                  max={100}
                  step={1}
                  value={[cameraSettings.contrast]}
                  onValueChange={(value) => handleSettingChange('contrast', value[0])}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="saturation" className="text-sm font-medium">
                  Saturation: {cameraSettings.saturation}
                </label>
                <Slider
                  id="saturation"
                  min={0}
                  max={100}
                  step={1}
                  value={[cameraSettings.saturation]}
                  onValueChange={(value) => handleSettingChange('saturation', value[0])}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Live Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <StreamingVideo client={client} request={emptyRequest} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MonitoringPage;

