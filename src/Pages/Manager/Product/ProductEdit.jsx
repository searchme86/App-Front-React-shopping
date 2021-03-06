import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Textarea,
  Input,
} from '@chakra-ui/react';
import FileBase from 'react-file-base64';
import defaultImg from '../../../Assets/Image/default-product-upload.png';
import { toast } from 'react-toastify';
import {
  SectionUnit,
  SectionLayout,
  SectionTitle,
  SectionContent,
  FlexAlignDiv,
  PForm,
  PFormContent,
  PFormUnit,
  PFormList,
  PFormBundle,
  PFormLi,
  PFormBlockTitle,
  PFormBlockTitleDes,
  PFormLiItem,
  PFormBlock,
  PFormDesWrapper,
  PFormDes,
  PFormDesList,
  PFormDesLi,
  TagWrapper,
  TagContainer,
  TagItem,
  TagItemDelete,
  TagInput,
  TagItemList,
  PButtonArea,
  PButtonList,
  PButtonLi,
} from './ProductUpload.style';
import { PFormButton } from '../../../Config/Styles/Button.style.js';
import {
  FormWrapper,
  SectionDivier,
} from '../../../Assets/Styles/Layout.style';
import { OffScreenSpan } from '../../../Assets/Styles/Basic.style';
import { Image, ImageHolder } from '../../../Assets/Styles/Image.style';

import { useDispatch, useSelector } from 'react-redux';
import {
  ngetProduct,
  ncreateProduct,
} from '../../../Store/Features/NProductSlice';

import {
  getCategoryList,
  CategorySelector,
} from '../../../Store/Features/CategorySlice';

import { useNavigate, useParams } from 'react-router-dom';
import ProductPostCode from './ProductPostCode';

function ProductEdit() {
  const {
    category: { categories },
  } = useSelector(CategorySelector);

  const {
    user: {
      newUser: { imageFile, nickname },
    },
  } = useSelector((state) => state.auth);

  const { ProductSize, ProductDegree, ProductStatus, nproduct, error } =
    useSelector((state) => state.nproduct);

  const categoryValue = Object.values(categories).map(
    ({ _id, categoryTitle }) => {
      return { id: _id, PdCategoryValue: categoryTitle };
    }
  );

  const [pdInfo, setPdInfo] = useState(nproduct);
  const {
    pdTitle,
    pdImage,
    pdPrice,
    pdDes,
    pdWish,
    pdBrand,
    pdType,
    pdtags,
    pdStatus,
    pdSizeInfo,
    pdColorInfo,
  } = pdInfo;

  const [pdCategory, setPdCategory] = useState('');
  const [prdSize, setPrdSize] = useState(pdSizeInfo);
  const [prdColor, setPrdColor] = useState(pdColorInfo);
  const [prdNewStatus, setPrdStatus] = useState('');
  const [pdDegree, setPdDegree] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const [tags, setTags] = useState(pdStatus);
  const [pdNewtags, setPdNewtags] = useState(pdtags);

  const [pdAddress, setAddress] = useState('');
  const [inputAddressValue, setInputAddressValue] = useState(
    '???????????? ????????? ????????? ????????? ????????????.'
  );
  const [postModalOpen, setPostModalOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryList({ toast }));
    if (id) {
      dispatch(ngetProduct(id));
    }
  }, []);

  useEffect(() => {
    if (isOpen === false) {
      setPostModalOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const changeAddressValue = () => {
      if (!pdAddress) return;
      if (pdAddress) {
        const {
          data: { zonecode },
          fullAddress,
        } = pdAddress;
        setInputAddressValue(`${fullAddress}, ${zonecode}`);
      }
    };
    changeAddressValue();
  }, [pdAddress]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  // ??? ?????? ?????? ?????????
  const onInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      e.stopPropagation();
      setPdInfo({ ...pdInfo, [name]: value });
    },
    [pdInfo]
  );

  //  ????????? ??? ?????? ?????????
  const addSize = useCallback(
    (e, index) => {
      const {
        target: { name, value },
      } = e;
      const list = [...prdSize];
      list[index][name] = value;
      setPrdSize(list);
    },
    [prdSize]
  );

  const removeSizeField = useCallback(
    (index) => {
      const list = [...prdSize];
      list.splice(index, 1);
      setPrdSize(list);
    },
    [prdSize]
  );

  const addSizeField = useCallback(() => {
    setPrdSize([...prdSize, { pdSize: '', pdPriceBySize: '' }]);
  }, [prdSize]);

  //  ?????? ??? ?????? ?????????
  const addColor = useCallback(
    (e, index) => {
      const {
        target: { name, value },
      } = e;
      const list = [...prdColor];
      list[index][name] = value;
      setPrdColor(list);
    },
    [prdColor]
  );

  const addColorField = useCallback(() => {
    setPrdColor([...prdColor, { pdColor: '', pdPriceByColor: '' }]);
  }, [prdColor]);

  const removeColorField = useCallback(
    (index) => {
      const list = [...prdColor];
      list.splice(index, 1);
      setPrdColor(list);
    },
    [prdColor]
  );

  const selectCategory = useCallback((e) => {
    setPdCategory(e.target.value);
  }, []);

  const selectStatus = useCallback((e) => {
    setPrdStatus(e.target.value);
  }, []);

  const selectDegree = useCallback((e) => {
    setPdDegree(e.target.value);
  }, []);

  // ?????? ?????? ??????
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // ?????? ?????? ??????
  const handlePostModal = useCallback((e) => {
    e.preventDefault();
    setIsOpen((value) => !value);
    setPostModalOpen(true);
  }, []);

  // ?????? ?????? ??????
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key !== 'Enter') return;
      const value = e.target.value;
      if (!value.trim()) return;
      setTags([...tags, value]);
      e.target.value = '';
      e.preventDefault();
    },
    [tags]
  );

  // ?????? ?????? ??????
  const removeTag = useCallback(
    (index) => {
      setTags(tags.filter((el, i) => i !== index));
    },
    [tags]
  );

  // ?????? ?????? ??????
  const handleTags = useCallback(
    (e) => {
      if (e.key !== 'Enter') return;
      const value = e.target.value;
      if (!value.trim()) return;
      setPdNewtags([...pdNewtags, value]);
      e.target.value = '';
      e.preventDefault();
    },
    [pdNewtags]
  );

  // ?????? ?????? ??????
  const removePdTag = useCallback(
    (index) => {
      setPdNewtags(pdNewtags.filter((el, i) => i !== index));
    },
    [pdNewtags]
  );

  // ????????????, ????????? ???????????? ?????? ???, ????????? ????????? ?????? ?????????
  const filterLastItem = (data) => {
    if (!data) return;
    const convertArray = Object.values([...data]);
    let deleteLastItem = convertArray.filter(
      (item, index) => index < convertArray.length - 1
    );
    return deleteLastItem;
  };

  let prdSizeItem = filterLastItem(prdSize);
  let prdColorItem = filterLastItem(prdColor);

  //?????? ????????? ??????
  const newProduct = useMemo(() => {
    return {
      pdCategory,
      pdUploaderNickname: nickname,
      pdUploaderImage: imageFile,
      pdBrand,
      pdType,
      pdTitle,
      pdImage,
      pdPrice,
      pdDes,
      pdWish,
      pdDegree,
      pdNewtags,
      inputAddressValue,
      pdStatus: [prdNewStatus, ...tags],
      newPdSizeInfo: [...prdSizeItem],
      newPdColorInfo: [...prdColorItem],
    };
  }, [
    pdCategory,
    nickname,
    imageFile,
    pdTitle,
    pdBrand,
    pdType,
    pdImage,
    pdPrice,
    pdDes,
    pdWish,
    pdDegree,
    pdNewtags,
    inputAddressValue,
    prdNewStatus,
    tags,
    prdSizeItem,
    prdColorItem,
  ]);

  // ????????? ???????????? ?????? ?????? ??????
  const postCode = { handleClose, isOpen, setAddress };

  // ?????? submit ?????? ?????? ??????
  const filledIn = [
    pdCategory,
    pdBrand,
    pdTitle,
    pdImage,
    pdPrice,
    pdDegree,
    prdNewStatus,
    pdWish,
    pdDes,
  ].every(Boolean);

  const canSubmit = pdNewtags.length !== 0 && filledIn;
  const checked = postModalOpen;

  // react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const registerForm = useCallback(
    (event) => {
      dispatch(ncreateProduct({ newProduct, navigate, toast }));
    },
    [dispatch, navigate, newProduct]
  );

  return (
    <SectionUnit>
      <SectionLayout>
        <SectionTitle>?????? ????????????</SectionTitle>
        <SectionContent>
          <PForm onSubmit={handleSubmit(registerForm)}>
            <FormControl
              isInvalid={errors}
              position="relative"
              display="flex"
              justifyContent="space-between"
              margin={'20px 0 20px 0'}
            >
              <FlexAlignDiv fixed>
                <PFormContent>
                  {/* ?????? ???????????? */}
                  <PFormUnit>
                    <FormLabel htmlFor="pdCategory" fontWeight="bold">
                      ?????? ????????????
                    </FormLabel>
                    <PFormDesWrapper>
                      <PFormDesList>
                        <PFormDesLi>
                          <PFormDes>*?????? ?????????????????????</PFormDes>
                        </PFormDesLi>
                        <PFormDesLi>
                          <PFormDes>????????? ??????????????? ??????????????????</PFormDes>
                        </PFormDesLi>
                      </PFormDesList>
                    </PFormDesWrapper>
                    <Select
                      id="pdCategory"
                      name="pdCategory"
                      placeholder="????????? ??????????????? ??????????????????"
                      value={pdCategory}
                      {...register('pdCategory', {
                        required: '????????? ??????????????? ????????? ?????????',
                        onChange: selectCategory,
                      })}
                    >
                      {categoryValue.map(({ id, PdCategoryValue }) => (
                        <option value={PdCategoryValue} key={id}>
                          {PdCategoryValue}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage as="p">
                      {errors?.pdCategory && errors?.pdCategory?.message}
                    </FormErrorMessage>
                  </PFormUnit>

                  {/* ?????? ????????? */}
                  <PFormUnit>
                    <FormLabel htmlFor="PFormImg" fontWeight="bold">
                      ?????? ?????????
                    </FormLabel>
                    <PFormDesWrapper>
                      <PFormDesList>
                        <PFormDesLi>
                          <PFormDes>*?????? ?????????????????????</PFormDes>
                        </PFormDesLi>
                        <PFormDesLi>
                          <PFormDes>????????? ???????????? ??????????????????</PFormDes>
                        </PFormDesLi>
                      </PFormDesList>
                    </PFormDesWrapper>
                    <ImageHolder>
                      <Image
                        src={pdImage ? pdImage : defaultImg}
                        alt="ddd"
                        id="PFormImg"
                      />
                    </ImageHolder>
                    <SectionDivier>
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                          setPdInfo({ ...pdInfo, pdImage: base64 })
                        }
                      />
                    </SectionDivier>
                  </PFormUnit>

                  <PButtonArea>
                    <PButtonList>
                      <PButtonLi>
                        <PFormButton
                          type="submit"
                          disabled={!canSubmit}
                          canSubmit={canSubmit}
                        >
                          ?????? ????????????
                        </PFormButton>
                      </PButtonLi>
                    </PButtonList>
                  </PButtonArea>
                  <div className="" style={{ display: 'flex' }}></div>
                </PFormContent>
              </FlexAlignDiv>

              <FlexAlignDiv>
                <PFormContent>
                  <fieldset>
                    <legend>
                      <OffScreenSpan>???????????? ??????</OffScreenSpan>
                    </legend>

                    {/* ????????? */}
                    <PFormUnit>
                      <FormLabel htmlFor="pdTitle" fontWeight="bold">
                        ?????????
                      </FormLabel>
                      <PFormDesWrapper>
                        <PFormDesList>
                          <PFormDesLi>
                            <PFormDes>*?????? ?????????????????????</PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              ????????? ????????? ??????????????? (???: ???????????? )
                            </PFormDes>
                          </PFormDesLi>
                        </PFormDesList>
                      </PFormDesWrapper>
                      <Input
                        type="text"
                        id="pdTitle"
                        name="pdTitle"
                        value={pdTitle}
                        {...register('pdTitle', {
                          required: '???????????? ??????????????????',
                          onChange: onInputChange,
                        })}
                      />
                      <FormErrorMessage as="p">
                        {errors.pdTitle && errors.pdTitle.message}
                      </FormErrorMessage>
                    </PFormUnit>

                    {/* ?????? ????????? */}
                    <PFormUnit>
                      <FormLabel htmlFor="pdBrand" fontWeight="bold">
                        ?????? ?????????
                      </FormLabel>
                      <PFormDesWrapper>
                        <PFormDesList>
                          <PFormDesLi>
                            <PFormDes>*?????? ?????????????????????</PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              *????????? ??????????????? ?????????????????? (???: ??????,??????,LG)
                            </PFormDes>
                          </PFormDesLi>
                        </PFormDesList>
                      </PFormDesWrapper>
                      <Input
                        type="text"
                        id="pdBrand"
                        name="pdBrand"
                        value={pdBrand}
                        {...register('pdBrand', {
                          required: '????????? ??????????????? ??????????????????',
                          onChange: onInputChange,
                        })}
                      />
                      <FormErrorMessage as="p">
                        {errors.pdBrand && errors.pdBrand.message}
                      </FormErrorMessage>
                    </PFormUnit>

                    {/* ?????? ?????? */}
                    <PFormUnit>
                      <FormLabel htmlFor="pdType" fontWeight="bold">
                        ?????? ??????
                      </FormLabel>
                      <PFormDesWrapper>
                        <PFormDesList>
                          <PFormDesLi>
                            <PFormDes>*?????? ?????????????????????</PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              *????????? ????????? ?????????????????? (???: ?????????, ?????????,
                              ?????????, ?????????,)
                            </PFormDes>
                          </PFormDesLi>
                        </PFormDesList>
                      </PFormDesWrapper>
                      <Input
                        type="text"
                        id="pdType"
                        name="pdType"
                        value={pdType}
                        {...register('pdType', {
                          required: '????????? ??????????????? ??????????????????',
                          onChange: onInputChange,
                        })}
                      />
                      <FormErrorMessage as="p">
                        {errors.pdType && errors.pdType.message}
                      </FormErrorMessage>
                    </PFormUnit>

                    {/* ???????????? */}
                    <PFormUnit>
                      <FormLabel htmlFor="pdPrice" fontWeight="bold">
                        ????????????
                      </FormLabel>
                      <PFormDesWrapper>
                        <PFormDesList>
                          <PFormDesLi>
                            <PFormDes>*?????? ?????????????????????</PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              ???????????? ????????? ????????? ??????????????????
                            </PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              '???' ????????? ???????????? ?????????????????? (???: 10000???
                              <OffScreenSpan>??????</OffScreenSpan> &rarr; 10000{' '}
                              <OffScreenSpan>
                                ?????? ??????????????? ???????????? ??????????????????
                              </OffScreenSpan>
                              )
                            </PFormDes>
                          </PFormDesLi>
                        </PFormDesList>
                      </PFormDesWrapper>
                      <Input
                        type="number"
                        id="pdPrice"
                        name="pdPrice"
                        value={pdPrice}
                        autoComplete="off"
                        {...register('pdPrice', {
                          required: '?????? ????????? ??????????????????',
                          maxLength: {
                            value: 7,
                            message: '???????????? ???????????? 7???????????????.',
                          },
                          onChange: onInputChange,
                        })}
                      />
                      <FormErrorMessage as="p">
                        {errors.pdPrice && errors.pdPrice.message}
                      </FormErrorMessage>
                    </PFormUnit>

                    {/* ???????????? */}
                    <PFormUnit>
                      <FormLabel htmlFor="pdDes" fontWeight="bold">
                        ????????????
                      </FormLabel>
                      <PFormDesWrapper>
                        <PFormDesList>
                          <PFormDesLi>
                            <PFormDes>*?????? ?????????????????????</PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>????????? ?????? ???????????? ???????????????</PFormDes>
                          </PFormDesLi>
                        </PFormDesList>
                      </PFormDesWrapper>
                      <Textarea
                        id="pdDes"
                        name="pdDes"
                        value={pdDes}
                        placeholder={pdDes}
                        size="sm"
                        resize="none"
                        {...register('pdDes', {
                          required: '????????? ????????? ??????????????????',
                          onChange: onInputChange,
                        })}
                      />
                      <FormErrorMessage as="p">
                        {errors?.pdDes && errors?.pdDes?.message}
                      </FormErrorMessage>
                    </PFormUnit>

                    {/* ?????? ???????????? */}
                    <PFormUnit>
                      <FormLabel fontWeight="bold">?????? ????????????</FormLabel>
                      <PFormDesWrapper>
                        <PFormDesList>
                          <PFormDesLi>
                            <PFormDes>*?????? ?????????????????????</PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              '#'??? ???????????? '?????????'??? ??????????????????
                            </PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              ??????????????? ????????? ????????? ????????? ???????????????
                            </PFormDes>
                          </PFormDesLi>
                        </PFormDesList>
                      </PFormDesWrapper>
                      <TagWrapper>
                        <TagContainer>
                          <TagItemList>
                            {pdNewtags.map((tag, index) => (
                              <TagItem key={index}>
                                <span className="text">{tag}</span>
                                <TagItemDelete
                                  onClick={() => removePdTag(index)}
                                >
                                  &times;
                                </TagItemDelete>
                              </TagItem>
                            ))}
                          </TagItemList>
                          <FormWrapper>
                            <TagInput
                              type="text"
                              onKeyPress={handleTags}
                              placeholder="????????? ?????? ????????? ?????????????????? (???: ??????)"
                            />
                          </FormWrapper>
                        </TagContainer>
                      </TagWrapper>
                    </PFormUnit>

                    {/* ???????????? */}
                    <PFormUnit>
                      <FormLabel htmlFor="pdDegree" fontWeight="bold">
                        ????????????
                      </FormLabel>
                      <PFormDesWrapper>
                        <PFormDesList>
                          <PFormDesLi>
                            <PFormDes>*?????? ?????????????????????</PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              ??????????????? ????????? ????????? ????????? ????????? ?????????
                            </PFormDes>
                          </PFormDesLi>
                        </PFormDesList>
                      </PFormDesWrapper>
                      <Select
                        id="pdDegree"
                        name="pdDegree"
                        placeholder="????????? ????????? ????????? ?????????"
                        value={pdDegree}
                        {...register('pdDegree', {
                          required: '????????? ????????? ????????? ?????????',
                          onChange: selectDegree,
                        })}
                      >
                        {ProductDegree.map(({ value, id }) => (
                          <option value={value} key={id}>
                            {value}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage as="p">
                        {errors?.pdDegree && errors?.pdDegree?.message}
                      </FormErrorMessage>
                    </PFormUnit>

                    {/* ???????????? ?????? */}
                    <PFormUnit>
                      <FormLabel htmlFor="pdStatus" fontWeight="bold">
                        ???????????? ??????
                      </FormLabel>
                      <PFormDesWrapper>
                        <PFormDesList>
                          <PFormDesLi>
                            <PFormDes>
                              *?????? ????????????????????? (???, ?????? ????????? ???????????????.)
                            </PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              ??????????????? ????????? ????????? ???????????? ?????????
                              ??????????????????
                            </PFormDes>
                          </PFormDesLi>
                        </PFormDesList>
                      </PFormDesWrapper>
                      <Select
                        id="pdStatus"
                        name="pdStatus"
                        placeholder="??????????????? ????????? ????????? ?????????"
                        value={prdNewStatus}
                        {...register('pdStatus', {
                          required: '??????????????? ????????? ????????? ?????????',
                          onChange: selectStatus,
                        })}
                      >
                        {ProductStatus.map(({ id, value }) => (
                          <option key={id} value={value}>
                            {value}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage as="p">
                        {errors?.pdStatus && errors?.pdStatus?.message}
                      </FormErrorMessage>

                      <PFormDesWrapper style={{ marginTop: '10px' }}>
                        <PFormDesList>
                          <PFormDesLi>
                            <PFormDes>
                              ??????????????? ???????????? ?????? ????????? ??????????????????
                            </PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              ?????? ?????? ??? ????????? ??????????????????
                            </PFormDes>
                          </PFormDesLi>
                        </PFormDesList>
                      </PFormDesWrapper>
                      <TagWrapper>
                        <TagContainer>
                          <TagItemList>
                            {tags.map((tag, index) => (
                              <TagItem key={index}>
                                <span className="text">{tag}</span>
                                <TagItemDelete onClick={() => removeTag(index)}>
                                  &times;
                                </TagItemDelete>
                              </TagItem>
                            ))}
                          </TagItemList>
                          <FormWrapper>
                            <TagInput
                              type="text"
                              onKeyPress={handleKeyDown}
                              placeholder="????????? ??????????????????"
                            />
                          </FormWrapper>
                        </TagContainer>
                      </TagWrapper>
                    </PFormUnit>

                    {/* ?????????????????? */}
                    <PFormUnit>
                      <FormLabel htmlFor="pdWish" fontWeight="bold">
                        ?????? ????????????
                      </FormLabel>
                      <PFormDesWrapper>
                        <PFormDesList>
                          <PFormDesLi>
                            <PFormDes>*?????? ?????????????????????</PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              ????????? ?????? ??????????????? ??????????????????
                            </PFormDes>
                          </PFormDesLi>
                        </PFormDesList>
                      </PFormDesWrapper>
                      <Textarea
                        placeholder="??? : ?????? ??????????????? ?????? ???????????? ?????????."
                        id="pdWish"
                        name="pdWish"
                        size="sm"
                        resize="none"
                        autoComplete="off"
                        {...register('pdWish', {
                          required: '?????? ????????? ??????????????? ??????????????????',
                          onChange: onInputChange,
                        })}
                      />
                    </PFormUnit>

                    {/* ???????????? ???????????? ?????? */}
                    <PFormUnit>
                      <FormLabel htmlFor="pdAddress" fontWeight="bold">
                        ???????????? ????????????
                      </FormLabel>
                      <PFormDesWrapper>
                        <PFormDesList>
                          <PFormDesLi>
                            <PFormDes>
                              ??????????????? ???????????? ????????? ??????????????????
                            </PFormDes>
                          </PFormDesLi>
                          <PFormDesLi>
                            <PFormDes>
                              ???????????? ???????????? ????????? ???????????? ????????? ??????
                              ????????? ??????????????????. ?????????????????? ????????????
                              ??????????????????
                            </PFormDes>
                          </PFormDesLi>
                        </PFormDesList>
                      </PFormDesWrapper>
                      <PFormLiItem>
                        <Input
                          type="text"
                          id="pdAddress"
                          name="pdAddress"
                          value={inputAddressValue}
                          disabled
                          width="400px"
                          {...register('pdAddress', {})}
                        />
                        <PFormButton
                          type="button"
                          onClick={handlePostModal}
                          checked={checked}
                          style={{ marginTop: '0px', marginLeft: 'auto' }}
                        >
                          ???????????? ??????
                        </PFormButton>
                      </PFormLiItem>
                      <FormErrorMessage as="p">
                        {errors.pdAddress && errors.pdAddress.message}
                      </FormErrorMessage>
                    </PFormUnit>

                    {/* ?????? ????????????, ????????? ??? ???????????? */}
                    <PFormBlock>
                      <PFormBlockTitle>
                        ????????? ??? ?????? ??????
                        <PFormBlockTitleDes>(*??????????????????)</PFormBlockTitleDes>
                      </PFormBlockTitle>
                      <PFormList>
                        {prdSize.map(({ pdSize, pdPriceBySize }, index) => (
                          <PFormLi key={index}>
                            <PFormLiItem>
                              <PFormBundle>
                                <PFormUnit>
                                  <FormLabel
                                    htmlFor="pdSize"
                                    mt="10px"
                                    fontWeight="bold"
                                  >
                                    ?????? ?????????
                                  </FormLabel>
                                  <PFormDesWrapper>
                                    <PFormDesList>
                                      <PFormDesLi>
                                        <PFormDes>
                                          ????????? ????????? ??? ????????? ????????? ???
                                          ????????????.
                                        </PFormDes>
                                      </PFormDesLi>
                                    </PFormDesList>
                                  </PFormDesWrapper>
                                  <Select
                                    id="pdSize"
                                    name="pdSize"
                                    placeholder="????????? ???????????? ??????????????????"
                                    value={pdSize}
                                    onChange={(e) => addSize(e, index)}
                                  >
                                    {ProductSize.map(({ id, value }) => (
                                      <option value={value} key={id}>
                                        {value}
                                      </option>
                                    ))}
                                  </Select>
                                </PFormUnit>
                                <PFormUnit>
                                  <FormLabel
                                    htmlFor="pdPriceBySize"
                                    mt="10px"
                                    fontWeight="bold"
                                  >
                                    ????????? ??? ????????????
                                  </FormLabel>
                                  <PFormDesWrapper>
                                    <PFormDesList>
                                      <PFormDesLi>
                                        <PFormDes>
                                          ?????? ???????????? ?????? ????????? ??????????????????
                                        </PFormDes>
                                      </PFormDesLi>
                                      <PFormDesLi>
                                        <PFormDes>
                                          '???' ????????? ???????????? ?????????????????? (???:
                                          10000???
                                          <OffScreenSpan>
                                            ??????
                                          </OffScreenSpan>{' '}
                                          &rarr; 10000{' '}
                                          <OffScreenSpan>
                                            ?????? ??????????????? ????????????
                                            ??????????????????
                                          </OffScreenSpan>
                                          )
                                        </PFormDes>
                                      </PFormDesLi>
                                    </PFormDesList>
                                  </PFormDesWrapper>
                                  <Input
                                    type="number"
                                    id="pdPriceBySize"
                                    name="pdPriceBySize"
                                    autoComplete="off"
                                    value={pdPriceBySize}
                                    onChange={(e) => addSize(e, index)}
                                  />
                                  <FormErrorMessage as="p">
                                    {errors?.pdPriceBySize &&
                                      errors?.pdPriceBySize?.message}
                                  </FormErrorMessage>
                                </PFormUnit>
                              </PFormBundle>
                              {prdSize.length - 1 === index && (
                                <PFormButton
                                  type="button"
                                  onClick={addSizeField}
                                  className="add-btn"
                                >
                                  ??????
                                </PFormButton>
                              )}
                            </PFormLiItem>
                            {prdSize.length !== 1 && (
                              <PFormButton
                                type="button"
                                onClick={() => removeSizeField(index)}
                                className="remove-btn"
                              >
                                Remove
                              </PFormButton>
                            )}
                          </PFormLi>
                        ))}
                      </PFormList>
                    </PFormBlock>

                    {/* ?????? ????????????, ?????? ??? ???????????? */}
                    <PFormBlock>
                      <PFormBlockTitle>
                        ?????? ??? ?????? ??????
                        <PFormBlockTitleDes>(*??????????????????)</PFormBlockTitleDes>
                      </PFormBlockTitle>
                      <PFormList>
                        {prdColor.map(({ pdColor, pdPriceByColor }, index) => (
                          <PFormLi key={index}>
                            <PFormLiItem>
                              <PFormBundle>
                                <PFormUnit>
                                  <FormLabel
                                    htmlFor="pdColor"
                                    mt="10px"
                                    fontWeight="bold"
                                  >
                                    ?????? ??????
                                  </FormLabel>
                                  <PFormDesWrapper>
                                    <PFormDesList>
                                      <PFormDesLi>
                                        <PFormDes>
                                          ????????? ?????? ??? ????????? ????????? ???
                                          ????????????.
                                        </PFormDes>
                                      </PFormDesLi>
                                    </PFormDesList>
                                  </PFormDesWrapper>
                                  <Input
                                    type="text"
                                    id="pdColor"
                                    name="pdColor"
                                    value={pdColor}
                                    autoComplete="off"
                                    onChange={(e) => addColor(e, index)}
                                  />
                                  <FormErrorMessage as="p">
                                    {errors?.pdColor &&
                                      errors?.pdColor?.message}
                                  </FormErrorMessage>
                                </PFormUnit>
                                <PFormUnit>
                                  <FormLabel
                                    htmlFor="pdPriceByColor"
                                    mt="10px"
                                    fontWeight="bold"
                                  >
                                    ?????? ??? ????????????
                                  </FormLabel>
                                  <PFormDesWrapper>
                                    <PFormDesList>
                                      <PFormDesLi>
                                        <PFormDes>
                                          ?????? ????????? ?????? ????????? ??????????????????
                                        </PFormDes>
                                      </PFormDesLi>
                                      <PFormDesLi>
                                        <PFormDes>
                                          '???' ????????? ???????????? ?????????????????? (???:
                                          10000???
                                          <OffScreenSpan>
                                            ??????
                                          </OffScreenSpan>{' '}
                                          &rarr; 10000{' '}
                                          <OffScreenSpan>
                                            ?????? ??????????????? ????????????
                                            ??????????????????
                                          </OffScreenSpan>
                                          )
                                        </PFormDes>
                                      </PFormDesLi>
                                    </PFormDesList>
                                  </PFormDesWrapper>
                                  <Input
                                    type="number"
                                    id="pdPriceByColor"
                                    name="pdPriceByColor"
                                    value={pdPriceByColor}
                                    autoComplete="off"
                                    onChange={(e) => addColor(e, index)}
                                  />
                                  <FormErrorMessage as="p">
                                    {errors?.pdPriceByColor &&
                                      errors?.pdPriceByColor?.message}
                                  </FormErrorMessage>
                                </PFormUnit>
                              </PFormBundle>
                              {prdColor.length - 1 === index && (
                                <PFormButton
                                  type="button"
                                  onClick={addColorField}
                                  className="add-btn"
                                >
                                  ??????
                                </PFormButton>
                              )}
                            </PFormLiItem>
                            {prdColor.length !== 1 && (
                              <PFormButton
                                type="button"
                                onClick={() => removeColorField(index)}
                                className="remove-btn"
                              >
                                Remove
                              </PFormButton>
                            )}
                          </PFormLi>
                        ))}
                      </PFormList>
                    </PFormBlock>
                  </fieldset>
                </PFormContent>
              </FlexAlignDiv>
            </FormControl>
          </PForm>
          {postModalOpen && <ProductPostCode postCode={postCode} />}
        </SectionContent>
      </SectionLayout>
    </SectionUnit>
  );
}

export default ProductEdit;
