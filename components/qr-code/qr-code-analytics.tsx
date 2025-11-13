"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQRCode, type QRCodeStatistics } from "@/contexts/qr-code-context"
import { useAuth } from "@/contexts/auth-context"
import { QrCode, Scan, Users, Calendar, MapPin, Globe, Clock, Smartphone, Monitor } from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function QRCodeAnalytics() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<QRCodeStatistics | null>(null)
  const { getQRCodeStatistics } = useQRCode()
  const { user } = useAuth()

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (user) {
        setLoading(true)
        try {
          const data = await getQRCodeStatistics(user.id)
          setStats(data)
        } catch (error) {
          console.error("Error fetching QR code analytics:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchAnalytics()
  }, [user, getQRCodeStatistics])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#ffc658", "#8dd1e1"]

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>QR Code Analytics</CardTitle>
          <CardDescription>Loading your QR code scan data...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
          </div>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!stats || stats.totalScans === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>QR Code Analytics</CardTitle>
          <CardDescription>Track and analyze your QR code scans</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <QrCode className="h-4 w-4" />
            <AlertTitle>No scan data available</AlertTitle>
            <AlertDescription>
              Your QR code hasn't been scanned yet. Share your QR code with others to start collecting analytics.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Analytics</CardTitle>
        <CardDescription>Track and analyze your QR code scans</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="time">Time Analysis</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                  <QrCode className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalScans}</div>
                  <p className="text-xs text-muted-foreground">Lifetime QR code scans</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.uniqueUsers}</div>
                  <p className="text-xs text-muted-foreground">Unique users who scanned your code</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.recentScans.length > 0
                      ? format(new Date((stats.recentScans[0] ? stats.recentScans[0].timestamp : undefined)), "MMM d, yyyy")
                      : "N/A"}
                  </div>
                  <p className="text-xs text-muted-foreground">Date of the most recent scan</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Scan Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {stats.scansByDay.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={stats.scansByDay.sort((a, b) => a.date.localeCompare(b.date))}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" tickFormatter={(date) => format(new Date(date), "MMM d")} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip
                        labelFormatter={(date) => format(new Date(date), "MMMM d, yyyy")}
                        formatter={(value) => [`${value} scans`, "Scans"]}
                      />
                      <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorScans)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">No trend data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Top Devices</CardTitle>
                </CardHeader>
                <CardContent className="h-[200px]">
                  {stats.scansByDevice.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.scansByDevice}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="device"
                          label={({ device, percent }) => `${device}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {stats.scansByDevice.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [`${value} scans`, props.payload.device]} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">No device data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Top Locations</CardTitle>
                </CardHeader>
                <CardContent className="h-[200px]">
                  {stats.scansByCountry.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.scansByCountry}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="country"
                          label={({ country, percent }) => `${country}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {stats.scansByCountry.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [`${value} scans`, props.payload.country]} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">No location data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="time">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Daily Scan Activity</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {stats.scansByDay.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={stats.scansByDay.sort((a, b) => a.date.localeCompare(b.date))}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(date) => format(new Date(date), "MMM d")} />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(date) => format(new Date(date), "MMMM d, yyyy")}
                          formatter={(value) => [`${value} scans`, "Scans"]}
                        />
                        <Bar dataKey="count" fill="#8884d8" name="Scans" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">No daily scan data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Hourly Scan Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {stats.scansByHour.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={stats.scansByHour.sort((a, b) => a.hour - b.hour)}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" tickFormatter={(hour) => `${hour}:00`} />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(hour) => `${hour}:00 - ${hour}:59`}
                          formatter={(value) => [`${value} scans`, "Scans"]}
                        />
                        <Bar dataKey="count" fill="#82ca9d" name="Scans" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">No hourly scan data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.scansByHour.length > 0
                        ? `${
                            stats.scansByHour.reduce((max, current) => (current.count > max.count ? current : max)).hour
                          }:00`
                        : "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground">Most active hour for QR scans</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Most Active Day</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.scansByDay.length > 0
                        ? format(
                            new Date(
                              stats.scansByDay.reduce((max, current) => (current.count > max.count ? current : max))
                                .date,
                            ),
                            "MMM d",
                          )
                        : "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground">Day with most QR code scans</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Daily Scans</CardTitle>
                    <QrCode className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.scansByDay.length > 0
                        ? (stats.scansByDay.reduce((sum, day) => sum + day.count, 0) / stats.scansByDay.length).toFixed(
                            1,
                          )
                        : "0"}
                    </div>
                    <p className="text-xs text-muted-foreground">Average scans per day</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="devices">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Device Types</CardTitle>
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="h-[200px]">
                    {stats.scansByDevice.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stats.scansByDevice}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="device"
                            label={({ device, percent }) => `${(percent * 100).toFixed(0)}%`}
                          >
                            {stats.scansByDevice.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name, props) => [`${value} scans`, props.payload.device]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-muted-foreground">No device data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Browsers</CardTitle>
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="h-[200px]">
                    {stats.scansByBrowser.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stats.scansByBrowser}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="browser"
                            label={({ browser, percent }) => `${(percent * 100).toFixed(0)}%`}
                          >
                            {stats.scansByBrowser.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name, props) => [`${value} scans`, props.payload.browser]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-muted-foreground">No browser data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Operating Systems</CardTitle>
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="h-[200px]">
                    {stats.scansByOS.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stats.scansByOS}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="os"
                            label={({ os, percent }) => `${(percent * 100).toFixed(0)}%`}
                          >
                            {stats.scansByOS.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name, props) => [`${value} scans`, props.payload.os]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-muted-foreground">No OS data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Device Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Top Devices</h4>
                      <div className="space-y-2">
                        {stats.scansByDevice.slice(0, 5).map((item) => (
                          <div key={item.device} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                {item.device}
                              </Badge>
                            </div>
                            <span className="text-sm">{item.count} scans</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Top Browsers</h4>
                      <div className="space-y-2">
                        {stats.scansByBrowser.slice(0, 5).map((item) => (
                          <div key={item.browser} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                {item.browser}
                              </Badge>
                            </div>
                            <span className="text-sm">{item.count} scans</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Top Operating Systems</h4>
                      <div className="space-y-2">
                        {stats.scansByOS.slice(0, 5).map((item) => (
                          <div key={item.os} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                {item.os}
                              </Badge>
                            </div>
                            <span className="text-sm">{item.count} scans</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="locations">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Scans by Country</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {stats.scansByCountry.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={stats.scansByCountry.sort((a, b) => b.count - a.count).slice(0, 10)}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="country" width={80} />
                          <Tooltip formatter={(value) => [`${value} scans`, "Scans"]} />
                          <Bar dataKey="count" fill="#8884d8" name="Scans" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-muted-foreground">No country data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Scans by City</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    {stats.scansByCity.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={stats.scansByCity.sort((a, b) => b.count - a.count).slice(0, 10)}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="city" width={80} />
                          <Tooltip formatter={(value) => [`${value} scans`, "Scans"]} />
                          <Bar dataKey="count" fill="#82ca9d" name="Scans" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-muted-foreground">No city data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Location Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Top Countries</h4>
                      <div className="space-y-2">
                        {stats.scansByCountry.slice(0, 5).map((item) => (
                          <div key={item.country} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{item.country}</span>
                            </div>
                            <span className="text-sm">{item.count} scans</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Top Cities</h4>
                      <div className="space-y-2">
                        {stats.scansByCity.slice(0, 5).map((item) => (
                          <div key={item.city} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{item.city}</span>
                            </div>
                            <span className="text-sm">{item.count} scans</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Location Coverage</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Countries Reached</p>
                          <p className="text-2xl font-bold">{stats.scansByCountry.length}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Cities Reached</p>
                          <p className="text-2xl font-bold">{stats.scansByCity.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Recent Scan Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentScans.length > 0 ? (
                    stats.recentScans.map((scan) => (
                      <div key={scan.id} className="flex items-start space-x-4 border-b pb-4 last:border-0">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Scan className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">QR Code Scanned</p>
                            <p className="text-xs text-muted-foreground">{format(new Date(scan.timestamp), "PPp")}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {scan.deviceInfo?.browser && (
                              <Badge variant="outline" className="text-xs">
                                {scan.deviceInfo.browser}
                              </Badge>
                            )}
                            {scan.deviceInfo?.os && (
                              <Badge variant="outline" className="text-xs">
                                {scan.deviceInfo.os}
                              </Badge>
                            )}
                            {scan.location?.city && (
                              <Badge variant="outline" className="text-xs">
                                <MapPin className="h-3 w-3 mr-1" />
                                {scan.location.city}, {scan.location.country || ""}
                              </Badge>
                            )}
                          </div>

                          {scan.location?.timezone && (
                            <p className="text-xs text-muted-foreground mt-1">Timezone: {scan.location.timezone}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No recent scan activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
