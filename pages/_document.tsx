import { NextPage } from "next";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

const desc = `Simple Todo List. Keep track of your tasks.
Add, edit, delete, and mark as complete easily.`;

const keywords = ["todo", "to-do", "to do", "task"]
  .flatMap((e) => [e, e + " list", e + " app", e + " manager"])
  .join(", ");

const MyDocument: NextPage = () => (
  <Html lang="en">
    <Head>
      <meta name="theme-color" content="#dea584" />

      <link rel="icon" href="/logo.png" />

      <meta content="/logo.png" itemProp="image" />
      <link rel="apple-touch-icon" href="/logo.png" />

      <meta property="og:title" content="Todo-list 📝" />
      <meta property="og:image" content="/logo.png" />
      <meta property="og:image:alt" content="Todo-list 📝" />
      <meta property="og:type" content="website" />

      <meta name="description" content={desc} />
      <meta property="og:description" content={desc} />
      <meta name="author" content="Erwan VIVIEN (github: erwan_vivien)" />
      <meta name="keywords" content={keywords} />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export async function getInitialProps(ctx: DocumentContext) {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps };
}

export default MyDocument;
