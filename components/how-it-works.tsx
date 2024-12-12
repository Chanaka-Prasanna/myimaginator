import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Import shadcn components
import { steps } from "@/constants";

const HowItWorks = () => {
  return (
    <div className="mt-16 h-auto">
      <div className="mx-auto  max-w-6xl px-4 text-center">
        <h2 className="section-title">How It Works</h2>
        <p className="section-description mb-6 mt-8  ">
          Simple, fast, and hassle-free.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="max-md:flex max-md:justify-center">
              <Card className=" h-[300px] w-full bg-card">
                <CardHeader className="flex flex-col items-center space-y-2">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gray-100 p-3 text-gray-700">
                    <step.icon size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-white">
                    {step.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-500">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
