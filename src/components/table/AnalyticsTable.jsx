import threeDots from '../../assets/icons/vertical-threeDots.png'
import { RiDeleteBin6Line, RiFileDownloadLine } from 'react-icons/ri';
import localDate from '../../hooks/localDate';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "../../components/Modal";
import axios from 'axios';
import { useState } from 'react';


const AnalyticsTable = ({ columns, data }) => {

    const deleteAnalytics = (id) => {
        console.log(id)
       axios.delete(`http://localhost:5000/common/api/v1/analytics-and-balance/${id}`)
       .then(res => {console.log(res); window.location.reload();})

    }

    return (
        <div className="table-wrapper">
            <table className="theme-table">
                <thead>
                <tr>
                    {columns?.map((col, index) => (
                    <th key={index}>{col.label}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {
                        data?.map((d) => 
                            <tr key={d?._id}>
                                <td>{d?._id}</td>
                                <td>{d?.reportsDate.slice(0,3)}</td>
                                <td>{d?.reportsDate.slice(4, 10)}</td>
                                <td>{localDate(d?.date)}</td>
                                <td>
                                    <DropdownMenu.Root>
                                        <DropdownMenu.Trigger asChild>
                                        <button className={`dropdown-trigger analytics-dropdown-btn`}>
                                            <img src={threeDots} />
                                        </button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Content
                                        align="left"
                                        side="bottom"
                                        className="dropdown-content artist-dropdown-content"
                                        style={{ width: "190px", left: "-200px" }}
                                        >
                                        <DropdownMenu.Item className="dropdown-item">
                                            <div>
                                                <a
                                                    href={d?.modifiedFileUrl}
                                                    download={`${d?.reportsDate}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ textDecoration: 'none', color: 'black' }}
                                                    >
                                                        <RiFileDownloadLine /> Download Report
                                                    </a>
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
                                                <RiDeleteBin6Line /> <span>Delete Report</span>
                                                </div>
                                            </Dialog.Trigger>
                                            <Dialog.Portal>
                                                <Dialog.Overlay className="dialog-overlay" />
                                                <Dialog.Content className="dialog-content">
                                                <Modal title="Delete Report?">
                                                    <p className="modal-description">
                                                    Are you sure you want to delete this report? This action
                                                    is irreversible, and you will not be able to recover the
                                                    deleted data.
                                                    </p>
                                                    <br />
                                                    <div className="analytics-deleteModal-btns">
                                                    <Dialog.Close>No</Dialog.Close>
                                                    <Dialog.Close onClick={() => deleteAnalytics(d._id)}>Yes, Delete</Dialog.Close>
                                                    {/* Hidden Dialog.Close for programmatic close */}
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

export default AnalyticsTable;