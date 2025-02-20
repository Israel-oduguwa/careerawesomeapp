"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Chart from "react-apexcharts";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { selectUserData } from "../../lib/redux/features/UserAuthentication/authenticationSlice";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentsSection from "./DocumentSection";
function HomePage() {
  const dispatch = useAppDispatch();
  // lets get the user data from the store
  const user_data = useAppSelector(selectUserData);
  const { theme, setTheme } = useTheme();
  console.log(theme);

  // destructure the user data
  const {
    authenticated,
    credentials: { userData },
    loading,
  } = user_data;
  console.log(userData);
  const chartData: any = {
    series: [90],

    plotOptions: {
      radialBar: {
        startAngle: -92,
        endAngle: 92,
        hollow: {
          margin: 15,
          size: "70%",
        },
        track: {
          background: "#e7e7e7",
          strokeWidth: "100%",
          margin: 1, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 1,
            left: 0,
            color: "#fff",
            opacity: 1,
            blur: 1,
          },
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: 0,
            color: theme === "dark" ? "#fff" : "#000",
            fontSize: "12px",
            fontWeight: "400",
            show: true,
          },
          value: {
            offsetY: -35,
            fontSize: "16px",
            color: theme === "dark" ? "#fff" : "#000",
            fontWeight: "700",
            show: true,
          },
        },
      },
    },

    stroke: {
      lineCap: "butt",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["Progress"],
  };

  return (
    <>
      <div className="bootstrap-wrapper">
        <div className="container p-[0px!important]">
          <section className="mb-5">
            <div>
              <div className="row items-center">
                <div className="col-md-12 col-lg-8 mt-6">
                  <div>
                    <Card className="px-6 py-4 shadow-lg border-slate-100 dark:border-0">
                      <CardDescription>
                        <div className="row items-center">
                          <div className="col-md-8 ">
                            <div className="max-w-[400px]">
                              <h1 className="text-2xl text-slate-900 dark:text-white font-bold mt-1 antialiased mb-2">
                                Hi {userData.profile.firstName}, welcome back
                              </h1>
                              <p className="text-slate-700 dark:text-slate-200 mt-2 text-sm  antialiased">
                                Start now by creating your resume clicking the
                                button below to create resume.
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <Chart
                              options={chartData}
                              series={chartData.series}
                              type="radialBar"
                              height={195} // Adjust height as needed
                            />
                          </div>
                        </div>
                      </CardDescription>
                    </Card>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 mt-6">
                  <Card className="px-6 py-6 shadow-lg dark:border-0 border-slate-100">
                    <CardDescription>
                      <div className="flex gap-3">
                        <div>
                          <h3 className="text-xl text-slate-900 dark:text-white font-bold mt-1 antialiased ">
                            Upgrade to pro
                          </h3>
                          <p className="text-slate-500 dark:text-slate-200 mt-1 text-sm  antialiased">
                            Unlock all features to career awesome
                          </p>
                        </div>
                        <div>
                          <img
                            style={{ width: "150px" }}
                            src="https://uko-react.vercel.app/static/illustration/upgrade-pro.png"
                            alt="upgrade image"
                          />
                        </div>
                      </div>
                    </CardDescription>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          <section id="professional-documents">
            <div className="p-3 mt-8">
              <h2 className="text-xl font-bold text-slate-900 m-0">
                Documents
              </h2>
              <DocumentsSection />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default HomePage;
