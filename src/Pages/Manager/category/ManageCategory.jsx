import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CategoryView from './CategoryView';
import { SectionTitle } from '../../../Assets/Styles/Text.style.js';
import {
  SectionContainer,
  SectionDivier,
} from '../../../Assets/Styles/Layout.style.js';
import { getCategoryList } from '../../../Store/Features/CategorySlice';
import { toast } from 'react-toastify';
import {
  SectionContent,
  SectionLayout,
  SectionUnit,
} from '../Product/ProductUpload.style';
import { OffScreenTitle } from '../../../Assets/Styles/Basic.style';

function ManageCategory() {
  const { categories } = useSelector((state) => state.category);
  console.log('현재categories ', categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryList({ toast }));
  }, []);

  return (
    <SectionUnit>
      <SectionLayout>
        <OffScreenTitle>카테고리별 상품찾기</OffScreenTitle>
        <SectionContent>
          <CategoryView categories={categories} />
        </SectionContent>
      </SectionLayout>
    </SectionUnit>
  );
}

export default ManageCategory;
