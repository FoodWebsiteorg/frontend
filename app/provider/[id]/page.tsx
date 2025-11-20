import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProviderProfile from "@/components/provider/provider-profile"

export default async function ProviderProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const provider = await prisma.providerDetails.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          mobile: true,
        },
      },
      reviews: {
        include: {
          customer: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!provider) {
    notFound()
  }

  const averageRating =
    provider.reviews.length > 0
      ? provider.reviews.reduce((acc: any, r: { rating: any }) => acc + r.rating, 0) /
        provider.reviews.length
      : 0

  return (
    <ProviderProfile
      provider={provider}
      averageRating={averageRating}
    />
  )
}

