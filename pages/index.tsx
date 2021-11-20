import React, { Component, useEffect } from 'react'
import { Layout } from '@components/common'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import ProductList from './pb/components/ProductList';
import ProductGrid from './pb/components/ProductGrid';
import { createRequest } from './pb/network/GraphQl';

declare var x: any;
var x = require('simi-pagebuilder-react')
const { PageBuilderComponent, usePbFinder }= x


export async function getStaticProps({
  preview,
  params,
  locale,
  locales,
}: GetStaticPropsContext) {  
  let query = createRequest();
  const res = await fetch(query)
  const data = await res.json()  
  const config = { locale, locales }
  return {
    props: { data },
  }
}


export default function Home({data}: InferGetStaticPropsType<typeof getStaticProps>) {  
  //path data 
  let pageData = {masked_id: null};
  if(data) {    
    const pbData = data.data.spb_page.items;        
    pbData.forEach((item: any) => {
      if(item.url_path == "/" && item.status){
        pageData = item;
        return;
      }
    });
  }  
  if (pageData) {    
    let maskId = pageData.masked_id;
    return (
        <PageBuilderComponent key={pageData.masked_id} pageData={pageData} ProductList={ProductList}  ProductGrid={ProductGrid}/>
    )      
  }
  return <h1>Loading...</h1>;  
}

Home.Layout = Layout
