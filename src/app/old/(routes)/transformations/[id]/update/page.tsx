import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Header from "@/components/old/shared/Header";
import TransformationForm from "@/components/old/shared/TransformationForm";
import { transformationTypes } from "@/constants/old";
import { getUserById } from "@/lib/old/actions/user.actions";
import { getImageById } from "@/lib/old/actions/image.actions";

const Page = async (props: SearchParamProps) => {
  const params = await props.params;

  const {
    id
  } = params;

  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;
