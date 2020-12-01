import Logo from '@/components/tentacle-logo';

export default function DefaultLayout({ children }) {
  return (
    <div>
      <header className="px-6 py-4 bg-blue-gray-900">
        <Logo />
      </header>

      <div className="px-6 bg-gray-100">{children}</div>
    </div>
  );
}
