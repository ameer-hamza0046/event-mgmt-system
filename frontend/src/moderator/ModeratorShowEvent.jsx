import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModeratorNavBar from "./components/ModeratorNavBar";
import ModeratorFooter from "./components/ModeratorFooter";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import ModeratorComments from "../components/ModeratorComments";

const ModeratorCommentsModal = () => {
  const { eventId } = useParams();
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-secondary px-4 me-md-2"
        data-toggle="modal"
        data-target="#moderatorComments"
      >
        Moderator Comments
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="moderatorComments"
        data-backdrop="static"
        data-keyboard="true"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Moderator Comments
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <ModeratorComments eventId={eventId} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AddCommentModal = () => {
  const { id, eventId } = useParams();
  const [event, setEvent] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/events/${eventId}`
        );
        setEvent({ ...response.data });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);
  const handleSendComment = async () => {
    if (!message) {
      alert("Message field cannot be empty!");
      return;
    }
    try {
      const d = new Date();
      const comments = [...event.comments];
      comments.unshift({
        moderatorId: id,
        time: d.toISOString(),
        comment: message,
      });
      const response = await axios.put(
        `http://localhost:5555/events/${eventId}`,
        {
          ...event,
          comments: comments,
        }
      );
      console.log(response.data);
      alert("Comment sent successfully!");
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-info me-md-2 px-4"
        data-toggle="modal"
        data-target="#sendComment"
      >
        Send Comment
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="sendComment"
        data-backdrop="static"
        data-keyboard="true"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Send Comment
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <div className="form-group">
                  <label>Comment</label>
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSendComment}
              >
                Send Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ApproveEventModal = ({ event }) => {
  const { id, eventId } = useParams();
  const closeRef = useRef();
  const navigate = useNavigate();
  const handleApprove = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5555/events/${eventId}`,
        {
          ...event,
          status: "approved",
        }
      );
      console.log(response.data);
      alert("Event approved successfully!");
      closeRef.current.click();
      navigate(`/moderator/${id}/view-pending-events`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-success px-4"
        data-toggle="modal"
        data-target={`#staticBackdrop${eventId}`}
      >
        Approve Event
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id={`staticBackdrop${eventId}`}
        data-backdrop="static"
        data-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {event.name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Do you wish to approve this event?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleApprove}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ModeratorShowEvent = () => {
  const { id, eventId } = useParams();
  // useState and useEffect
  const [event, setEvent] = useState({});
  const [organizer, setOrganizer] = useState({});
  const [loading, setLoading] = useState(true);
  ///////////
  useEffect(() => {
    const fun = async () => {
      try {
        let response = await axios.get(
          `http://localhost:5555/events/${eventId}`
        );
        const orgId = response.data.organizerId;
        setEvent(response.data);
        response = await axios.get(`http://localhost:5555/users/${orgId}`);
        setOrganizer(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);
  return (
    <>
      <ModeratorNavBar />
      <div className="container">
        <h2>Event Details</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="form-group">
              <label>Event Name</label>
              <input
                type="text"
                className="form-control"
                value={event.name}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Organizer Name</label>
              <input
                type="text"
                className="form-control"
                value={organizer.name}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                className="form-control"
                value={event.date.split("T")[0]}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Event Status</label>
              <input
                type="text"
                className="form-control"
                value={event.status}
                readOnly
              />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link
                to={`/moderator/${id}/view-pending-events`}
                type="button"
                className="btn btn-secondary px-4 me-md-2"
              >
                Go Back
              </Link>
              <button className="btn btn-success btn-wow me-md-2 px-4">
                <a
                  href="https://www.mandurah.wa.gov.au/-/media/files/com/downloads/explore/events/organisers/events-application-form.pdf"
                  target="blank"
                >
                  View Application Form
                </a>
              </button>
              <ModeratorCommentsModal />
              <AddCommentModal />
              <ApproveEventModal event={event} />
            </div>
          </div>
        )}
      </div>
      <ModeratorFooter />
    </>
  );
};

export default ModeratorShowEvent;
