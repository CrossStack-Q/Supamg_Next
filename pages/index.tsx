import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  )


  const { data } = await supabaseAdmin
  .from('images')
  .select("*")
  .order('id');
  return {
    props: {
      images: data
    },
  }
}

type Image = {
  id: number
  href: string
  imageSrc: string
  name: string
  username: string
}



function Gallery({images}:{images: Image[]}) {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="text-4xl p-4 m-auto font-bold text-blue-500 hover:text-gray-700 hover:border hover:rounded-md hover:border-blue-500 hover:bg-white cursor-pointer">
          Image Gallery
        </div>
      </div>

    
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {/* Images will go here */}
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
        
      </div>
    </div>
    </div>
  );
}

function BlurImage({image}:{image: Image}) {
  const [isLoading, setLoading] = useState(true);
  return (
    <a href="#" className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={image.imageSrc}
          alt=""
          className={cn(
            "group-hover:opacity-75",
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
          )}
          onLoadingComplete={() => setLoading(false)}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.username}</p>
    </a>
  );
}

export default Gallery;
