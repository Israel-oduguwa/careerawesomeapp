
import React, { useState, useEffect, useRef } from "react";

interface SectionProps {
    data: any;
  }

const Section: React.FC<SectionProps> = ({ data }) => {
    return (
      <div className="section" style={{ margin: data.margin, padding: data.padding }}>
        <h2 style={{ fontSize: data.titleSize }}>{data.title}</h2>
        <div style={{ fontSize: data.fontSize }}>{data.content}</div>
      </div>
    );
  };

interface ResumeProps {
  data: any;
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
  const [sections, setSections] = useState(data.sections);
  const [pages, setPages] = useState<any[]>([]);

  const resumeRef = useRef<HTMLDivElement>(null);
  const pageHeight = data.pageHeight; // A4 or letter height in px

  const handleReorder = (newOrder: string[]) => {
    const reorderedSections = newOrder.map((sectionName) =>
      sections.find((section: any) => section.name === sectionName)
    );
    setSections(reorderedSections);
  };

  useEffect(() => {
    handleReorder(data.sectionOrder);
  }, [data.sectionOrder]);

  useEffect(() => {
    const paginate = () => {
      if (!resumeRef.current) return;
      const children = Array.from(resumeRef.current.children);
      const pages: any[] = [];
      let currentPage: any[] = [];
      let currentPageHeight = 0;

      children.forEach((child: any) => {
        const childHeight = child.offsetHeight;
        if (currentPageHeight + childHeight > pageHeight) {
          pages.push(currentPage);
          currentPage = [child];
          currentPageHeight = childHeight;
        } else {
          currentPage.push(child);
          currentPageHeight += childHeight;
        }
      });

      if (currentPage.length > 0) {
        pages.push(currentPage);
      }

      setPages(pages);
    };

    paginate();
  }, [sections, pageHeight]);

  return (
    <div ref={resumeRef} className="resume">
      {pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className="page"
          style={{
            marginBottom: "20px",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            background: data.pageColor,
            padding: data.paperPadding,
            height: pageHeight,
          }}
        >
          {page.map((section: any, sectionIndex: number) => (
            <Section key={sectionIndex} data={section.props.data} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Resume;
