import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { AuthSelector, setLogout } from '../Store/Features/AuthSlice';
import { searchTours } from '../Store/Features/TourSlice';

import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

function Header() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const { user } = useSelector((state) => ({ ...state.auth }));

  // const something = useSelector(AuthSelector);
  // console.log('something', something);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //백엔드에서 1시간으로 토큰이 만료가 되기 때문에 토큰 처리를 해야함
  const token = user?.token;

  console.log('보이나 user', user);
  console.log('보이나 token', token);

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      //토큰이 만료된다면,
      dispatch(setLogout());
    }
  }

  //헤더 우측의 인풋창에 텍스트를 입력하면 실행하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch('');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <MDBNavbar expand="lg" style={{ backgroundColor: '#f0e6ea' }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: '#606080', fontWeight: '600', fontSize: '22px' }}
        >
          Touropedia
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: '#606080' }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.newUser?._id && (
              <h5 style={{ marginRight: '30px', marginTop: '27px' }}>
                Logged in as: {user?.newUser?.name}
              </h5>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.newUser?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/create">
                    <p className="header-text">제품등록</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                {/* <MDBNavbarItem>
                  <MDBNavbarLink href="/addTour">
                    <p className="header-text">Add Tour</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem> */}
              </>
            )}
            {user?.newUser?._id ? (
              <>
                {/* <MDBNavbarItem>
                  <MDBNavbarLink href="/userProduct">
                    <p className="header-text">나의상품</p>
                  </MDBNavbarLink>
                </MDBNavbarItem> */}

                {/* <MDBNavbarItem>
                  <MDBNavbarLink href="/upload">
                    <p className="header-text">상품등록</p>
                  </MDBNavbarLink>
                </MDBNavbarItem> */}
                {/* <MDBNavbarItem>
                  <MDBNavbarLink href="/category">
                    <p className="header-text">카테고리 관리</p>
                  </MDBNavbarLink>
                </MDBNavbarItem> */}
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login">
                    <p className="header-text" onClick={() => handleLogout()}>
                      Logout
                    </p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
            {user?.newUser?.imageFile ? (
              <MDBNavbarItem>
                <MDBNavbarLink href={`/profile/${user.newUser.nickname}`}>
                  <div className="">
                    <img
                      src={user?.newUser?.imageFile}
                      alt={user?.newUser?.name}
                      style={{ width: '50px', marginTop: '10px' }}
                    />
                  </div>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              ''
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Tour"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: '5px', marginLeft: '5px' }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;
