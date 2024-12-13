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
  const configRequest = new cctv.CameraSettings();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const minMaxValue = {
    brightness: { min: 0, max: 255 },
    contrast: { min: 0, max: 255 },
    saturation: { min: 0, max: 255 },
  };
  const [cameraSettings, setCameraSettings] = useState({
    brightness: -1,
    contrast: -1,
    saturation: -1,
  });
  const [peopleDetected, setPeopleDetected] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const getDetection = () => {
    client.getDetection(emptyRequest, {}, async (err, response) => {
      if (err) {
        console.error(`Unexpected error: code = ${err.code}, message = "${err.message}"`);
      } else {
        try {
          setPeopleDetected(response.getCount());
        } catch (error) {
          console.error('Error processing detected person count:', error);
        }
      }
    });
  };

  const getCameraSettings = () => {
    client.getCameraSettings(emptyRequest, {}, async (err, response) => {
      if (err) {
        console.error(`Unexpected error: code = ${err.code}, message = "${err.message}"`);
      } else {
        try {
          setCameraSettings({
            brightness: response.getBrightness(),
            contrast: response.getContrast(),
            saturation: response.getSaturation(),
          });
        } catch (error) {
          console.error('Error fetching camera settings:', error);
        }
      }
    });
  };

  const handleSetCameraSettings = () => {
    configRequest.setBrightness(cameraSettings.brightness);
    configRequest.setContrast(cameraSettings.contrast);
    configRequest.setSaturation(cameraSettings.saturation);

    client.setCameraSettings(configRequest, {}, async (err, response) => {
      if (err) {
        console.error(`Unexpected error: code = ${err.code}, message = "${err.message}"`);
      }
    });
  };

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
  };

  useEffect(() => {
    const intervalId = setInterval(getDetection, 100);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    getCameraSettings();
  }, []);

  useEffect(() => {
    handleSetCameraSettings();
  }, [cameraSettings]);

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
              <p>Date: {currentTime.toLocaleDateString()}</p>
              <p>Time: {currentTime.toLocaleTimeString()}</p>
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
                  min={minMaxValue.brightness.min}
                  max={minMaxValue.brightness.max}
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
                  min={minMaxValue.contrast.min}
                  max={minMaxValue.contrast.max}
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
                  min={minMaxValue.saturation.min}
                  max={minMaxValue.saturation.max}
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

