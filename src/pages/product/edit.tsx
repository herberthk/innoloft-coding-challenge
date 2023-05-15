import Meta from "@/components/common/Meta";
import DetailSection from "@/components/product/DetailSection";
import MainSection from "@/components/product/MainSection";
import Title from "@/components/product/Title";
import UserInfo from "@/components/product/UserInfo";
import VideoSection from "@/components/product/VideoSection";
import {
  useGetConfigurationQuery,
  useGetProductQuery,
} from "@/services/productApi";
import React from "react";

const Edit = () => {
  const { isLoading, error, data } = useGetProductQuery("6781");
  const { data: config } = useGetConfigurationQuery("1");
  return (
    <>
      <Meta title="Edit product" />
      <div className="container m-auto mb-7 mt-2 flex flex-col justify-around md:mb-11 md:flex-row md:gap-4">
        <div className="w-full drop-shadow-md md:w-[60%]">
          <Title name={data?.name} edit={false} />
          <MainSection
            ImageUrl={data?.picture}
            type={data?.type}
            name={data?.name}
            description={data?.description}
            editMode={true}
          />
          <VideoSection url={data?.video!} editMode={true} />
          <DetailSection
            businessModels={data?.businessModels}
            categories={data?.categories}
            cost={data?.investmentEffort}
            trl={data?.trl}
            editMode={true}
          />
        </div>

        <div className="w-full md:w-[400px]">
          {config?.hasUserSection && (
            <UserInfo company={data?.company} user={data?.user} />
          )}
        </div>
      </div>
    </>
  );
};

export default Edit;
