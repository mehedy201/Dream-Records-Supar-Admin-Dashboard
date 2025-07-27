import releasePlaceHolderImg from '../../assets/release-placeholder.png'
import threeDots from '../../assets/icons/vertical-threeDots.png'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LuImageDown } from 'react-icons/lu';
import { FiArrowRight } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import localDate from '../../hooks/localDate';
import { Link } from 'react-router-dom';

const ReleaseTable = ({ columns = [], data }) => {

    // const handleDownloadImage = async (link) => {
        // const imageUrl = link;
        // const response = await fetch(imageUrl);
        // const blob = await response.blob();
        // const url = window.URL.createObjectURL(blob);
        // const a = document.createElement("a");
        // a.href = url;
        // a.download = "Artwork.jpg"; // ✅ আপনি চাইলে ডাইনামিক নামও বসাতে পারেন
        // document.body.appendChild(a);
        // a.click();
        // a.remove();
        // window.URL.revokeObjectURL(url);
    // };



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
                        data?.map((d) => 
                            <tr key={d?._id}>
                                <td>
                                    <Link
                                        to={`/release/${d?._id}`}
                                        style={{ color: "#1C2024", textDecoration: "none" }}
                                        className="artistTable-img-row"
                                        >
                                        <img
                                            src={d?.imgUrl ? d.imgUrl : releasePlaceHolderImg}
                                            alt=""
                                            style={{ borderRadius: "6px" }}
                                        />
                                        <p>
                                            {d?.releaseTitle?.length > 22
                                            ? d?.releaseTitle.slice(0, 22) + "..."
                                            : d?.releaseTitle}
                                        </p>
                                    </Link>
                                </td>
                                <td>{d?.userName}</td>
                                <td>{d?.labels?.map(label => label.labelName)}</td>
                                <td>{d?.UPC ? d.UPC : '--'}</td>
                                <td>{localDate(d?.date)}</td>
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
                                            className="dropdown-content qcApproval-dropdown-content"
                                        >
                                            <DropdownMenu.Item className="dropdown-item">
                                            <div>
                                                <a
                                                    href={d?.imgUrl}
                                                    download={`${d?.imgUrl}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ textDecoration: 'none', color: 'black' }}
                                                    >
                                                        <LuImageDown /> Download Artwork
                                                </a>
                                            </div>
                                            </DropdownMenu.Item>
                                            <hr />
                                            <DropdownMenu.Item className="dropdown-item">
                                            <div>
                                                {
                                                    d?.status === 'QC Approval' || d?.status === 'Pending' &&
                                                    <><FiArrowRight /> <span onClick={() => moveToReview(d)}>Move to Review</span></>
                                                }
                                                {
                                                    d?.status === 'Review' &&
                                                    <><FiArrowRight /> <span onClick={() => moveToLive(d)}>Move to Live</span></>
                                                }
                                            </div>
                                            </DropdownMenu.Item>
                                            <hr />
                                            <DropdownMenu.Item className="dropdown-item">
                                            <div>
                                                <RiDeleteBin6Line /> <span>Reject Release</span>
                                            </div>
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

export default ReleaseTable;