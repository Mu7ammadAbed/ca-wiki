import React from 'react';
import UserContainer from '../../components/UserContainer';
import OverviewComponent from '../../components/OverviewComponent';
import logo from '../../assets/images/login-logo.jpeg';
import InternalProjectsImg from '../../assets/images/Group 3039.svg';

const data = {
  firstTitle: 'Students Projects',
  secondTitle: 'Internal Projects Phase',
  content:
    'The Code Academy Is Palestine’s First Full-Stack Coding Bootcamp With A Flagship Campus In Gaza And Second Campus Opening In The West Bank In November 2018. The Code Academy Is A Joint Project Of Mercy Corps/Gaza Sky Geeks And Founders & Coders International. We Train 16 Students Per Cohort In A Full-Time, Intensive Course For 8 Weeks With An Additional 16 Weeks Of Project-Based Learning With Real-World Clients To Jumpstart Your Professional Portfolio. The Objective Is To Graduate As Full-Stack Developers Who Can Deploy Production-Grade Software Online And Secure High-Quality Jobs With Companies Or Work As Freelance Developers.',
  buttonText: 'See Internal Projects Phase',
  imageSource: InternalProjectsImg,
  btnLink: '/projects?type=internal',
  titleIsDark: true,
  backgroundIsRed: true,
};

const InternalProjectsOverview = () => {
  const {
    firstTitle,
    secondTitle,
    content,
    buttonText,
    imageSource,
    btnLink,
    titleIsDark,
    backgroundIsRed,
  } = data;
  return (
    <UserContainer
      rightPageColor="black"
      headerLogo={logo}
      isCohortPages={false}
    >
      <OverviewComponent
        firstTitle={firstTitle}
        secondTitle={secondTitle}
        content={content}
        buttonText={buttonText}
        imageSource={imageSource}
        btnLink={btnLink}
        titleIsDark={titleIsDark}
        backgroundIsRed={backgroundIsRed}
      />
    </UserContainer>
  );
};

export default InternalProjectsOverview;
