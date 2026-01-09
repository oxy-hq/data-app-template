This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Use oxy sdk

```tsx
// App.tsx
const FILE_PATHS = {
  table1: "table1.parquet",
  table2: "table2.parquet",
  table3: "table3.parquet",
};

function App() {
  return (
    <OxyProvider files={FILE_PATHS} useAsync>
      {children}
    </OxyProvider>
  );
}
```

```tsx
// Dashboard.tsx
function Dashboard() {
  const { sdk, isLoading, error } = useOxy();

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!sdk) {
    return;
    error ? (
      <ErrorPage>Failed to initialize sdk: {JSON.stringify(error)}</ErrorPage>
    ) : (
      <div>Oxy SDK is not initialized</div>
    );
  }

  return <DataApp />;
}
```

```tsx
// DataApp.tsx
function DataApp {
  const { sdk } = useOxy();
  const [data, setData] = useState<TableData>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const result: QueryResult = await sdk.query(`SELECT * FROM ${name} LIMIT 100`);

      const tableData: TableData = {
        columns: result.columns,
        rows: result.rows,
        total_rows: result.rowCount
      };

      setData(tableData);
    }
  }, []);

  return (
    <div>
      {/**
      * Data app components
      */}
    </div>
  )
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
