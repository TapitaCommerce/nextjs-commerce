import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COLLECTION_DETAILS } from '../getCollection.gql';
import { InnerLink } from '../../../../Collection/components/InnerLink/InnerLink';
import { CarefreeHorizontalScroll } from '../others/PaginationScroll/CarefreeHorizontalScroll';
import { Link } from 'react-router-dom';
import './categoryScroll.scss';
export const CategoryScroll = (props) => {
    const { item } = props;
    const { data } = useQuery(GET_COLLECTION_DETAILS, {
        fetchPolicy: 'cache-first',
    });
    const imageStyle = {
        display: 'block',
        margin: '10px auto',
        width: '100%',
        height: '72px',
    };
    console.log(data);
    if (item && data) {
        const collectionData = data.collections.edges;
        const content = collectionData.map((x, i) => {
            return (
                <Link
                    className={'cl-item'}
                    to={'/collections/' + x.node.handle}
                >
                    {x.node.image ? (
                        <div>
                            <img
                                src={x.node.image.transformedSrc}
                                alt={x.node.title}
                                style={imageStyle}
                            />
                            <div className='cate_name'>{x.node.title}</div>
                        </div>
                    ) : (
                        <div className='cate_name-no-image'>{x.node.title}</div>
                    )}
                </Link>
            );
        });
        return (
            <CarefreeHorizontalScroll
                item={item}
                pagingStyle={{
                    marginTop: 5
                }}
                _numberOfChildren={collectionData.length}
            >
                {content}
            </CarefreeHorizontalScroll>
        )
    };
    return "";
}