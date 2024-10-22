import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SkyneticStractions',
  description: 'Shattering the usual, SkyneticStractions creates a powerful synthesis of motion and abstract ideation under the infinite digital sky.',
};

const AuthLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div
      className="flex items-center justify-center h-full text-center p-4 bg-white bg-opacity-50 rounded-lg"
      style={{ backgroundImage: "url('/backgrounds/CyberneticLandscape1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {children}
    </div>
  );
}

export default AuthLayout;