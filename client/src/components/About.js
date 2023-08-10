import React from 'react'

function About() {
  return (
    <div className="our-story-container">
      <div className="our-story-content">
        <div className="story-image">
          <img
            src="../assets/eventgo.png"
            alt="Our Story"
            className="story-image"
          />
        </div>
        <div className="story-details">
          <h2 className="story-title">Our Journey</h2>
          <p className="story-text">
            Welcome to EventGo, a place where unforgettable memories
            are made. Our journey began with a vision to create a platform that
            brings people together to experience the magic of live events. From
            electrifying concerts to mesmerizing theater performances, we've
            been at the heart of it all.
          </p>
          <p className="story-text">
            EventGo was founded by a team of passionate event
            enthusiasts who wanted to revolutionize the way people discover,
            plan, and attend events. Our commitment to excellence and
            user-friendly experience has made us a leading name in the event
            industry.
          </p>
          <p className="story-text">
            Over the years, we've collaborated with artists, venues, and event
            organizers to bring you the finest selection of events. Our
            dedication to providing a seamless and enjoyable experience for our
            users has driven us to continuously innovate and improve.
          </p>
          <p className="story-text">
            Our community is the heart and soul of EventGo. We take
            pride in being a platform where event-goers can connect, share, and
            create memories that last a lifetime. Together, we celebrate
            diversity, creativity, and the joy of shared experiences.
          </p>
          <p className="story-text">
            Join us on this exciting journey and be a part of the EventGo family. Whether you're an artist, an event organizer, or a
            passionate event-goer, there's a place for you here. Let's continue
            to make moments that matter.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About
