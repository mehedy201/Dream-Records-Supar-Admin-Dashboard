import React, { useState } from 'react';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Modal from "../../components/Modal";
import * as Dialog from "@radix-ui/react-dialog";
import localDate from '../../hooks/localDate';
import threeDots from '../../assets/icons/vertical-threeDots.png'
import { RiDeleteBin6Line, RiEyeLine } from 'react-icons/ri';
import { GoPencil } from 'react-icons/go';
import { Button } from '@radix-ui/themes';
import localTime from '../../hooks/localTime';
import { Link, useNavigate } from 'react-router-dom';
import artistDemoImg from '../../assets/artists/artist4.png'
import FormSubmitLoading from '../FormSubmitLoading';


const ArtistTable = ({columns, data}) => {

    const navigate = useNavigate();


    const [deleteLoading, setDeleteLoading] = useState(false);
    // Delete Artist________________________
    const deleteArtist = (id, imgKey) => {
        setDeleteLoading(true);
        axios
        .delete(
            `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/delete-artist/${id}?imgKey=${imgKey}`
        )
        .then((res) => {
            if (res.status == 200) {
            setDeleteLoading(false);
            navigate("/artists/1/10");
            } else {
            setDeleteLoading(false);
            }
        })
        .catch((er) => console.log(er));
    };


    return (
        <div className="table-wrapper">
      <table className="theme-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {
                data &&
                data?.map(d => 
                    <tr>
                        <td>
                            <Link
                                to={`/artist-details/${d?._id}/1/10/Live`}
                                style={{ color: "#1C2024", textDecoration: "none" }}
                                // state={{ artist: row }}
                                className=" artistTable-img-row"
                            >
                                <img src={d?.imgUrl ? d?.imgUrl : artistDemoImg} alt="" />
                                <p>{d?.artistName}</p>
                            </Link>
                        </td>
                        <td>{d?.userName}</td>
                        <td>{d?.email ? d?.email : '--'}</td>
                        <td>{localDate(d?.date)} {localTime(d?.date)}</td>
                        <td>
                            <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                            <button className="dropdown-trigger artist-dropdown-btn">
                                <img src={threeDots} />
                            </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Content
                            align="left"
                            side="bottom"
                            className="dropdown-content artist-dropdown-content"
                            >
                            <DropdownMenu.Item onClick={() => navigate(`/artist-details/${d?._id}/1/10/Live`)} className="dropdown-item">
                                <div>
                                <RiEyeLine /> View Details
                                </div>
                            </DropdownMenu.Item>
                            <hr />
                            <DropdownMenu.Item className="dropdown-item">
                                <div>
                                <GoPencil /> <span>Edit Artist</span>
                                </div>
                            </DropdownMenu.Item>
                            <hr />
                            <DropdownMenu.Item
                                className="dropdown-item"
                                onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing
                            >
                                <Dialog.Root>
                                <Dialog.Trigger asChild>
                                    <div>
                                    <RiDeleteBin6Line /> <span>Delete Artist</span>
                                    </div>
                                </Dialog.Trigger>
                                <Dialog.Portal>
                                    <Dialog.Overlay className="dialog-overlay" />
                                    <Dialog.Content className="dialog-content">
                                    <Modal title="Delete Artist ?">
                                        <p className="modal-description">
                                        Are you sure you want to delete this label? This action is
                                        irreversible, and all associated data, including artist
                                        accounts, music releases, and analytics, will be
                                        permanently removed.
                                        </p>
                                        <br />
                                        {
                                            deleteLoading && <FormSubmitLoading/>
                                        }
                                        <div className="artist-deleteModal-btns">
                                        <Button>No</Button>
                                        <Button onClick={() =>deleteArtist(d._id, d?.imgKey)}>Yes, Delete</Button>
                                        </div>
                                    </Modal>
                                    </Dialog.Content>
                                </Dialog.Portal>
                                </Dialog.Root>
                            </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                        </td>
                    </tr>
                )
            }
        </tbody>
      </table>
    </div>
    );
};

export default ArtistTable;