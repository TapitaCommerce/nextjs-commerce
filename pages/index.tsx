import React, { Component, useEffect } from 'react'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
declare var x: any;
var x = require('simi-pagebuilder-react')
import { useRouter } from 'next/router'
import ProductList from './pb/components/ProductList';

const { PageBuilderComponent, usePbFinder }= x

const endPoint = 'https://tapita.io/pb/graphql/';
const integrationToken = '17nMVmUJAxdditfSvAqBqoC6VJKTKpD21626949895';

export default function Home() {  
  const router = useRouter()
  const k = usePbFinder({
    endPoint,
    integrationToken,
    getPageItems: true
  });
  const {
    loading: pbLoading,
    pageMaskedId,
    findPage,
    pathToFind,
    pageData
  } = k;

  useEffect(() => {
    if (
      router.pathname &&
      router.pathname === '/'
    ) {
      if (!pageMaskedId || router.pathname !== pathToFind)
        findPage(router.pathname);
    }
  }, [router, pageMaskedId, pathToFind, findPage]); 

    if (pageMaskedId) {    
      return (
        <>
          <PageBuilderComponent endPoint={endPoint} maskedId={pageMaskedId} ProductList={ProductList}/>
        </>
      )      
    }
    return <h1>Loading...</h1>;  
}

Home.Layout = Layout
