import { Chat } from '../components/Chat';

export default function Home() {
  return (
    <div className="h-screen">
      <main className="flex flex-col gap-[32px] h-full p-10 ">
        <Chat />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
