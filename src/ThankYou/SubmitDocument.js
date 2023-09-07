import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tick from "../Image/ticks.svg";
import cross from "../Image/cross.svg";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import axios from "axios";

import swal from "sweetalert";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "..";
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";
import { useSelector } from "react-redux";
import { getCardetailsByEmail } from "../functions";
import { UseUserContext } from "../UserContextAppProvider";
const SubmitDocument = () => {
  const { setToken, setUserData } = UseUserContext()
  const MotoformData = useSelector((state) => state.MotoformDataReducer);
  const navigate = useNavigate();

  const [showMore, setShowMore] = useState(true);
  const [policyData, setPolicyData] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [filedata, setFiledata] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [docData, setDocData] = useState({});
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  useEffect(() => {
    getDocumentsLob()
    GetAllDocuments()
  }, []);
  const getDocumentsLob = async () => {
    await axios
      .get(API_URL + "/api/getDocumentsLob?lob=Motor")
      .then((result) => {
        setPolicyData(result.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const GetAllDocuments = async () => {
    try {
      const response = await getCardetailsByEmail();
      setDocuments(response.documents);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    const updatedDocuments = [...uploadedDocuments];
    updatedDocuments[index] = file;
    setUploadedDocuments(updatedDocuments);
    console.log("updatedDocuments", updatedDocuments);
  };
  const handleModal = (file) => {
    setFiledata(file);
    console.log(filedata, "filedata");
    setShow(true);
  };
  const openModal = (id, index, name, docLenght) => {
    // GetAllDocuments()
    setDocData({
      id: id,
      index: index,
      fileName: name,
      DocTotal: docLenght,
    });
    try {
      axios
        .post(API_URL + "/api/get_Documents_listbyid", {
          method: "post",
          ParamValue: id,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((result) => {
          console.log(result.data.data);
          // setDocuments(result.data.data);
        });
    } catch (error) {
      console.log(error.message);
    }

    setVisible(!visible);
  };
  const uploadAllDocuments = async () => {
    const formData = new FormData();

    const docId = MotoformData.leadid;
    const documentName = docData.fileName;
    const documentFile = uploadedDocuments[docData.index];
    const fileIndex = docData.index;
    console.log({ documents });
    console.log({ uploadedDocuments });
    formData.append("id", docId);
    formData.append("name", documentName);
    formData.append("status", "");
    formData.append("reason", "");
    formData.append("file", documentFile);
    formData.append("fileindex", fileIndex);
    formData.append("totaldocs", docData.DocTotal);

    // return false;
    if (documentFile != null) {
      await axios
        .post(API_URL + "/api/update_single_documents", formData, {
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (data) => {
          if (data.status === 200) {
            // swal("Success!", "Updated", "success");
            setDocuments(data.data.data.documents);
            await GetAllDocuments();
            // setShow(false);
            setVisible(false)
          } else {
            swal("Error!", "Something went wrong", "error");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please select required document");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (MotoformData.email) {
      await axios.get(
        API_URL + "/api/documentSubmitLoginCustomer?email=" + MotoformData.email
      ).then((response) => {
        console.log("response data", response);

        if (response.status === 200) {
          setToken(response.data?.token);
          localStorage.setItem("usertoken", response.data.token);
          setUserData(response.data.data);
          navigate("/Mypolicies");
        } else {
          swal({
            title: "Error!",
            text: response.data.message,
            type: "error",
            icon: "error",
          })
        }
      })
    }


  };
  console.log("filedata", filedata);
  return (
    <div>
      <div className="policyrenewals">
        <div className="container myprofile1 pt-4 pb-4">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
              <div className="rowabcds">
                {policyData.map((doc, indeX) => (
                  <>
                    <div key={indeX} className="row policy_documents">
                      <div className="col-lg-6">
                        <p>{doc.document_type}</p>
                      </div>
                      <div className="col-lg-6">
                        <button
                          type="file"
                          className="uploaddocus"
                          onClick={() =>
                            openModal(
                              doc._id,
                              indeX,
                              doc.document_type,
                              doc.length
                            )
                          }
                        >
                          Upload
                        </button>

                        {documents.length > 0 &&
                          documents.map((docItem, i) => {
                            return docItem.name === doc.document_type ? (
                              <>
                                <button
                                  type="file"
                                  className="text-primary uploaddocus mx-2"
                                  onClick={() =>
                                    handleModal(docItem.file[0].filename)
                                  }
                                >
                                  View
                                </button>
                                {docItem.message != "" ? (
                                  <p className="text-danger">
                                    {docItem.reason}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              ""
                            );
                          })}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="gotodashboard mb-3 mt-3"
          onClick={handleLogin}
        >
          To view policy click on the below button
        </button>
      </div>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Upload {docData.fileName}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <input
              type="file"
              className="form-control"
              id="DHA"
              defaultValue=""
              required
              onChange={(e) => handleFileUpload(e, docData.index)}
            />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="gotodashboard12" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="gotodashboard" onClick={uploadAllDocuments}>
            Upload
          </CButton>
        </CModalFooter>
      </CModal>
      <Modal size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <div className="col-md-12">
                <div className="form-group col-md-12">
                  {filedata?.includes(".pdf") ? (
                    <div>
                      <iframe
                        title="PDF Viewer"
                        style={{
                          width: "100%",
                          height: "300px",
                          border: "none",
                        }}
                        src={`${API_URL}/documents/${filedata}`}
                      />
                    </div>
                  ) : (
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={`${API_URL}/documents/${filedata}`}
                    />
                  )}
                </div>
              </div>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubmitDocument;
