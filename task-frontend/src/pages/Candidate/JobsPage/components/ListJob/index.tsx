import { JobCard, JobDetailCard, Pagination } from "@/components/ui";

const ListJob = () => {
  const listTag: any = [
    {
      id: "1",
      name: "Công nghệ",
      color: "#FF0000",
    },
    {
      id: "2",
      name: "Thiết kế",
      color: "#0F00FF",
    },
  ];
  return (
    <section className="pb-10 pt-8">
      <div className="w-full lg:w-[85%] px-5 lg:px-0 mx-auto flex gap-3 max-h-[90vh]">
        <div className="hidden lg:block lg:w-[55%] ">
          <JobDetailCard
            name="[HCM] WEB DESIGNER[HCM]"
            employer="Công ty dược phẩm Phúc Long"
            fromDate="03/02/2002"
            toDate="03/02/2002"
            category="Công nghệ thông tin"
            image=""
            experience="3 năm kinh nghiệm"
            salary="Từ 50 - 60 triệu"
            location="Thành phố Hồ Chí Minh."
            tags={listTag}
            description="MÔ TẢ CÔNG VIỆC Làm việc tại địa phương sinh sống, phát triển thị
            trường (tuyến huyện, tỉnh, khu vực miền bắc). Phỏng vấn online, thử
            việc 2 tháng Xây dựng đội nhóm nhân sự kinh doanh vùng, hỗ trợ thúc
            đẩy phát triển hệ thống kinh doanh vùng phụ trách Tìm kiếm khách
            hàng mới (cá nhân, đại lý sơn, nhà thầu, đội thợ sơn, vật liệu xây
            dựng...) Tư vấn chính sách bán hàng trực tiếp, đàm phán, kí kết hợp
            đồng với khách hàng. Hỗ trợ, hướng dẫn nhân viên, các đại lý, NPP
            trong hệ thống. Truyền đạt, hướng dẫn NPP/ Đại lý thuộc hiểu đúng
            các chương trình khuyến mãi/ chính sách bán hàng, chính sách thưởng
            của công ty. Quản lý doanh số, giám sát đối chiếu công nợ của cửa
            hàng/đại lý trong khu vực phụ trách. Trực tiếp chịu trách nhiệm về
            doanh số cam kết, chỉ tiêu phân phối bán hàng các sản phẩm tại khu
            vực mình phụ trách. Xây dựng và phát triển mối quan hệ với khách
            hàng. Giải đáp các thắc mắc của khách hàng trong phạm vi quyền hạn,
            trách nhiệm được giao. Tìm hiểu, nắm bắt các hoạt động, chính sách
            của đối thủ trên thị trường, chia sẻ trong đội nhóm và đề xuất giải
            pháp, định hướng giải quyết với công ty. Duy trì quan hệ, chăm sóc
            khách hàng; tìm kiếm đối tác, xây dựng và phát triển mở rộng mạng
            lưới kinh doanh. YÊU CẦU CÔNG VIỆC Giới tính: Nam, nữ. Độ tuổi:
            25-35 Bằng cấp: tốt nghiệp từ trung cấp trở lên. Ưu tiên ứng viên có
            kinh nghiệm bán hàng các SP Sơn hoặc các SP liên quan đến vật liệu
            xây dựng, thầu công trình, thợ sơn, gia dụng. Có khả năng giao tiếp
            đàm phán thuyết phục với khách hàng đạt hiệu quả cao. Kỹ năng tổ
            chức và sắp xếp công việc tốt. Có tinh thần trách nhiệm, chăm chỉ,
            khéo léo, linh hoạt không ngại khó. Đam mê kinh doanh, năng động,
            sáng tạo, độc lập, chủ động trong công việc, hoàn thành tốt nhiệm vụ
            được giao. QUYỀN LỢI ĐƯỢC HƯỞNG Lương cứng + % hoa hồng + % thưởng
            doanh thu/quý/năm - Thu Nhập từ 30 đến 50 triệu, không giới hạn
            Hưởng lương tháng thứ 13, thưởng khác biệt Được công ty cung cấp các
            sản phẩm khác biệt, tạo định hướng riêng trong cạnh tranh bán hàng
            để đạt hiệu quả cao nhất Thưởng chế độ phúc lợi các ngày lễ, tết,
            sinh nhật và được hưởng đầy đủ chế độ BHXH, BHYT, BHTN, nghỉ mát
            theo quy định của công ty, nhà nước. Xét tăng lương hàng năm theo
            năng lực và mức độ cống hiến Được làm việc trong môi trường năng
            động và chuyên nghiệp. Cung cấp trang thiết bị đầy đủ để phục vụ
            công việc. Có cơ hội thăng tiến và phát huy được năng lực của bản
            thân. Được đào tạo và hướng dẫn bài bản chuyên môn. NỘP HỒ SƠ LIÊN
            HỆ Anh Tài Công Ty TNHH Kamax Việt Nam"
          />
        </div>
        <div className="w-full lg:w-[45%] overflow-y-auto  flex flex-col gap-3 scrollbar-custom">
          <JobCard
            image="https://source.unsplash.com/random/400x400"
            name="[HCM] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
            dateline="Còn 30 ngày"
            employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
            location="Thành phố Hồ Chí Minh"
            salary="Từ 30 - 50 triệu"
            isVip
            isHighlighted
          />
          <JobCard
            image="https://source.unsplash.com/random/400x400"
            name="[DL] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
            dateline="Còn 30 ngày"
            employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
            location="Thành phố Hồ Chí Minh"
            salary="Từ 30 - 50 triệu"
          />
          <JobCard
            image="https://source.unsplash.com/random/400x400"
            name="[HN] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
            dateline="Còn 30 ngày"
            employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
            location="Thành phố Hồ Chí Minh"
            salary="Từ 30 - 50 triệu"
            isVip
          />
          <JobCard
            image="https://source.unsplash.com/random/400x400"
            name="[VT] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
            dateline="Còn 30 ngày"
            employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
            location="Thành phố Hồ Chí Minh"
            salary="Từ 30 - 50 triệu"
          />
          <JobCard
            image="https://source.unsplash.com/random/400x400"
            name="[CT] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
            dateline="Còn 30 ngày"
            employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
            location="Thành phố Hồ Chí Minh"
            salary="Từ 30 - 50 triệu"
          />
          <JobCard
            image="https://source.unsplash.com/random/400x400"
            name="[NA] Web Designer[HCM] Web Designer[HCM] Web Designer[HCM]
                    Web Designer[HCM] Web Designer."
            dateline="Còn 30 ngày"
            employer="Công ty dược phẩm Phúc
                    Long Công ty dược phẩm Phúc Long"
            location="Thành phố Hồ Chí Minh"
            salary="Từ 30 - 50 triệu"
          />
        </div>
      </div>
      <div className="w-max mx-auto mt-8">
        <Pagination />
      </div>
    </section>
  );
};
export default ListJob;
