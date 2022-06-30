import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="mt-20 md:mt-20 lg:mt-40 flex flex-col-reverse xl:flex-row items-center justify-center gap-x-60 px-10 mb-36 sm:px-20 xl:px-40">
      <div className="flex flex-col gap-y-8 xl:gap-x-40 xl:w-1/2">
        <h1 className="text-4xl sm:text-5xl font-anek font-semibold leading-snug">
          Open source cost monitoring for cloud native environments
        </h1>
        <p className="lg:text-left text-xl leading-relaxed">
          OpenCost is a vendor-neutral open source project for measuring and
          allocating infrastructure and container costs in real time. Built by
          Kubernetes experts and supported by Kubernetes practitioners, OpenCost
          shines a light into the black box of Kubernetes spend.
        </p>
        <a href="/docs/install" className="hover:no-underline">
          <div className="text-white w-fit py-2 px-4 rounded-md bg-green-400 hover:bg-green-700 transition-colors duration-200">
            <span>Get started</span>
          </div>
        </a>
      </div>
      <div className="flex flex-col w-full md:w-4/5 lg:w-3/8 xl:w-4/8">
        <img className="w-full h-auto" src="/img/hero.png" alt="OpenCost" />
      </div>
    </div>
  );
}
