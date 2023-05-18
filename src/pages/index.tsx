import Meta from "@/components/common/Meta";
import UserInfo from "@/components/product/UserInfo";
import {
  useGetConfigurationQuery,
  useGetProductQuery,
} from "@/services/productApi";

export default function Home() {
  const { isLoading, error, data } = useGetProductQuery("6781");
  const { data: config } = useGetConfigurationQuery("1");
  return (
    <>
      <Meta />

      <div className="container m-auto mb-7 mt-2 flex flex-col justify-around md:mb-11 md:flex-row md:gap-4">
        <div className="flex h-screen w-full items-center justify-center drop-shadow-md md:w-[60%]">
          <h1 className="text-3xl">Main page</h1>
        </div>

        <div className="w-full md:w-[400px]">
          {config?.hasUserSection && (
            <UserInfo company={data?.company} user={data?.user} />
          )}
        </div>
      </div>
    </>
  );
}
