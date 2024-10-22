import { OrganizationProfile } from "@clerk/nextjs";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import Head from "next/head";
import Navbar from "@/components/dashboard/navbar";

export default function OrganizationProfilePage() {
  return (
    <>
      <header>
        <title>Skyneticstractions Organization Profile</title>
      </header>

      <div className="bg-neutral-900 h-screen flex flex-col justify-center items-center">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-96 rounded-md filter blur-3xl opacity-50 -z-50 gradientBackgroundGlobal" />
        <div className="flex flex-col">
          <p className="text-xl text-center text-sky-800 dark:text-red-900 font-bold mt-20 mb-9">SkynneticStractions Organization&apos;s Page</p>
        </div>
        <Link href="/dashboard">
          <button className="cyberrant-gradient flex flex-row justify-center items-center bg-primary-500 hover:bg-primary-600 rounded-lg px-5 py-1.5 border">
            <span className="mr-2 text-red-900 dark:text-sky-800">Back to Dashboard</span>
            <LinkIcon size={24} />
          </button>
        </Link>
        <div className="flex justify-center items-center h-full w-full">
          <OrganizationProfile
            routing='path'
            path="/organization-profile"
            afterLeaveOrganizationUrl="/app/dashboard"
            appearance={{
              variables: {
                colorSuccess: "#48BB78",
                colorWarning: "#E53E3E",
                colorBackground: "#2D3748",
                colorTextOnPrimaryBackground: "#D1D5DB",
                colorInputBackground: "#4A5568",
                colorTextSecondary: "#D1D5DB",
                colorInputText: "#2D3748",
                colorText: "#CBD5E0",
                colorPrimary: "#D1D5DB",
                fontFamily: "paparazzi-sans",
                fontSmoothing: 'auto',
                fontWeight: { normal: 400, bold: 700 },
                fontSize: "20px",
                borderRadius: '0.200rem',
                // colorAlphaShaded: "#718096", // Not working according to documentation
              }
            }}
          />
        </div>
      </div>
    </>
  );
}



