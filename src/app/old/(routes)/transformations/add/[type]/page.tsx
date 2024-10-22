import Header from '@/components/old/shared/Header'
import TransformationForm from '@/components/old/shared/TransformationForm';
import { transformationTypes } from '@/constants/old'
import { getUserById } from '@/lib/old/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async (props: SearchParamProps) => {
  const params = await props.params;

  const {
    type
  } = params;

  const { userId } = auth();
  const transformation = transformationTypes[type];

  if (!userId) redirect('/sign-in')

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title={transformation.title}
        subtitle={transformation.subTitle}
      />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage
