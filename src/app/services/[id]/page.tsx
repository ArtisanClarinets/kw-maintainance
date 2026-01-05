
import { notFound } from "next/navigation";
import { services } from "@/../content/services";
import { serviceDetails } from "@/../content/service-details";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  const detail = serviceDetails[id];

  if (!service || !detail) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | K & W Hospitality and Maintainance`,
    description: detail.seoDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  const detail = serviceDetails[id];

  if (!service || !detail) {
    notFound();
  }

  // Get related services (exclude current one, take up to 3)
  const relatedServices = services
    .filter((s) => s.id !== id)
    .slice(0, 3);

  return (
    <ServiceDetailTemplate
      service={service}
      detail={detail}
      relatedServices={relatedServices}
    />
  );
}
