"use client"

import { useState } from "react"
import { testFirebaseConnection } from "@/lib/firebase-test"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"

export default function TestFirebase() {
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    testDocId?: string;
    error?: any;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    try {
      const result = await testFirebaseConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Test failed',
        error
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Firebase Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleTest} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Testing...' : 'Test Firebase Connection'}
          </Button>

          {testResult && (
            <Alert variant={testResult.success ? "default" : "destructive"}>
              {testResult.success ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {testResult.success ? 'Success' : 'Error'}
              </AlertTitle>
              <AlertDescription>
                {testResult.message}
                {testResult.testDocId && (
                  <div className="mt-2 text-sm">
                    Test document ID: {testResult.testDocId}
                  </div>
                )}
                {testResult.error && (
                  <div className="mt-2 text-sm">
                    Error details: {JSON.stringify(testResult.error)}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 