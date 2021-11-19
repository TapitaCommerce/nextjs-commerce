import React, { Component, useEffect } from 'react'
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import commerce from '@lib/api/commerce'
import { Text } from '@components/ui'
import { Layout } from '@components/common'
import getSlug from '@lib/get-slug'
import { missingLocaleInPages } from '@lib/usage-warns'
import type { Page } from '@commerce/types/page'
import { useRouter } from 'next/router'
declare var x: any;
var x = require('simi-pagebuilder-react')
const { PageBuilderComponent, usePbFinder }= x
import ProductList from './pb/components/ProductList';
import ProductGrid from './pb/components/ProductGrid';

const endPoint = 'https://tapita.io/pb/graphql/';
const integrationToken = '17nMVmUJAxdditfSvAqBqoC6VJKTKpD21626949895';

export default function Pages() {
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
      router &&
      router.asPath 
    ) {      
      if (!pageMaskedId || router.asPath !== pathToFind)        
        findPage(router.asPath);
    }
  }, [router, pageMaskedId, pathToFind, findPage]);       
  if (pageMaskedId && pageMaskedId !== 'notfound') {
    return (
      <>
        <PageBuilderComponent key={pageMaskedId} endPoint={endPoint} maskedId={pageMaskedId} ProductList={ProductList} ProductGrid={ProductGrid}/>
      </>
    )      
  } else if (pbLoading) {
    return <h1>Loading...</h1>;  
  } else{
    return <h1>Not found</h1>;  
  }
}

Pages.Layout = Layout
