import { useEffect, useRef } from "react";

const PAGE_HEIGHT_MM = 27; // A4 height in mm
const PAGE_HEIGHT_PX = PAGE_HEIGHT_MM * 3.779528; // Convert mm to px
console.log(PAGE_HEIGHT_PX)
const PageBreakTest = () => {
    const contentRef = useRef<HTMLDivElement>(null);

    const debounce = (func: Function, wait: number) => {
      let timeout: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };
  
    useEffect(() => {
      const addPageBreaks = () => {
        const contentElement = contentRef.current;
        if (!contentElement) return;
  
        let currentHeight = 0;
        let tempHeight = 0;
        let pageBreakRequired = false;
  
        const childNodes = Array.from(contentElement.children);
  
        // Remove existing page break indicators
        // contentElement.querySelectorAll(`.${styles.pageBreakIndicator}`).forEach(indicator => indicator.remove());
  
        childNodes.forEach((child, index) => {
          const childElement = child as HTMLElement;
          const childHeight = childElement.offsetHeight;
  
          tempHeight += childHeight;
  
          if (tempHeight > PAGE_HEIGHT_PX) {
            pageBreakRequired = true;
            tempHeight = childHeight;
          }
  
          if (pageBreakRequired) {
            const pageBreak = document.createElement('div');
            // pageBreak.className = styles.pageBreakIndicator;
            pageBreak.innerHTML = '--- Page Break ---';
            contentElement.insertBefore(pageBreak, childElement);
  
            pageBreakRequired = false;
            currentHeight = childHeight;
          } else {
            currentHeight += childHeight;
          }
        });
      };
  
      const avoidBreakingText = () => {
        const contentElement = contentRef.current;
        if (!contentElement) return;
  
        const allElements = contentElement.querySelectorAll('*');
  
        allElements.forEach(element => {
          const clonedElement = element.cloneNode(true) as HTMLElement;
          clonedElement.style.visibility = 'hidden';
          contentElement.appendChild(clonedElement);
  
          if (clonedElement.offsetHeight > PAGE_HEIGHT_PX) {
            element.style.pageBreakInside = 'avoid';
          }
  
          contentElement.removeChild(clonedElement);
        });
      };
  
      const debouncedPageBreaks = debounce(() => {
        avoidBreakingText();
        addPageBreaks();
      }, 1000000);
  
    //   const observer = new MutationObserver(debouncedPageBreaks);
  
    //   observer.observe(contentRef.current, { childList: true, subtree: true });
  
      // Initial call
    //   debouncedPageBreaks();
  
      // Cleanup observer on component unmount
    //   return () => observer.disconnect();
    }, []);
  return (
    <div id="resume-content" ref={contentRef}>
      {/* Dynamic resume content here */}
      <section className="p-4">
        <h1>John Doe</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Dolorum, veritatis corrupti? Aperiam
          consequatur veritatis rem voluptates pariatur mollitia id dolore quasi
          itaque libero eligendi sit ullam sed molestias laborum omnis, alias
          eum eius qui perferendis quos tempore? Temporibus rerum tempore
          voluptates repellat vitae magni veniam omnis error vero eos
          accusantium rem nostrum quam numquam nulla, perspiciatis dolorum enim
          saepe. Quas vitae facilis dolor! Assumenda dolor, iste aspernatur
          molestias corrupti sint ratione est soluta ea quia minima consectetur,
          aliquam qui quos quaerat, distinctio error aut dignissimos!
          Reprehenderit vel molestiae ipsum minus laborum dolorum corrupti totam
          a aperiam. Provident temporibus similique labore suscipit impedit,
          itaque earum aut facere voluptatum explicabo minima ut dicta soluta
          eum consequatur saepe inventore accusantium nostrum iste totam.
          Repudiandae blanditiis, minus placeat aliquam voluptate omnis alias
          repellat aut sit id ut doloribus voluptatibus ratione. Sapiente nobis
          earum error exercitationem illo quos provident tempore. Asperiores
          pariatur consequuntur aut illo iusto eligendi ducimus rerum temporibus
          incidunt nostrum porro similique cum vitae, maxime consequatur ipsam
          repellendus ullam suscipit nobis totam officiis. Porro obcaecati
          reprehenderit similique, laudantium eum impedit veniam, ipsam iste
          veritatis ad nostrum optio velit doloribus! Eveniet dolore inventore
          molestias nostrum quae aliquam pariatur. Perferendis sit, doloribus
          temporibus maxime aspernatur eos dolores amet repellat ratione
          exercitationem illum, porro, similique necessitatibus libero
          blanditiis illo. Autem distinctio mollitia fuga provident possimus
          esse quo ea voluptatum repellat quidem exercitationem, unde,
          voluptates fugit veniam nam ipsum? Quidem nemo perferendis maxime
          illum quisquam ipsa alias veritatis dolorem commodi. Harum optio
          quaerat ducimus omnis? Non ducimus maiores omnis quidem soluta amet
          rerum sapiente sit. Hic enim cumque ipsam voluptatibus quo, minus
          nemo. Consequuntur in iste harum dolorum deserunt ratione itaque
          possimus illo quisquam, ipsum ullam quaerat rem esse tempora magni
          ipsa. Atque, explicabo hic officia cupiditate quia doloremque nisi
          labore quo temporibus unde voluptate minima, maiores ab aperiam
          repellendus aut enim. Magni, minus adipisci possimus nesciunt
          reprehenderit incidunt vel debitis temporibus voluptatem eaque
          voluptatum nulla modi, velit recusandae impedit, ipsa praesentium
          minima optio commodi voluptate qui voluptas omnis ducimus accusamus.
          Nobis, voluptatem. Sunt obcaecati possimus enim, nam impedit vel neque
          dignissimos, sit quam ipsa corporis quidem saepe exercitationem nemo
          nesciunt similique ducimus quaerat est autem. Veritatis, commodi ipsa.
          Sunt repellat, exercitationem aliquid, quibusdam quisquam vitae, rerum
          explicabo illo iure voluptate accusantium? Eveniet beatae fugit, eius
          est aut animi consectetur nesciunt eligendi inventore vero magnam
          maiores! Iure, voluptates qui. Nihil, veniam quo non voluptas ea neque
          aliquam dicta? Tenetur asperiores veritatis expedita, facere eaque
          voluptate ab ipsa nulla ipsum aperiam ea nihil quaerat unde magnam
          quia ipsam reiciendis voluptatum totam blanditiis eum harum quibusdam.
          Provident tempore aspernatur consectetur sit nam commodi quibusdam,
          accusantium reiciendis excepturi laudantium, voluptatem labore hic
          deleniti assumenda. Nihil omnis voluptate facilis ea nam dignissimos
          similique cum doloribus adipisci in a, dolor facere atque vel dicta.
          Voluptatem nostrum quae hic officia quam minima. Sint ipsa corporis,
          rem voluptas reiciendis odio numquam distinctio ipsum sit accusamus
          officiis, mollitia nesciunt fugiat minima sed quis autem quod
          obcaecati nulla reprehenderit! Culpa repellat excepturi consectetur
          nulla, assumenda dolores.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Dolorum, veritatis corrupti? Aperiam
          consequatur veritatis rem voluptates pariatur mollitia id dolore quasi
          itaque libero eligendi sit ullam sed molestias laborum omnis, alias
          eum eius qui perferendis quos tempore? Temporibus rerum tempore
          voluptates repellat vitae magni veniam omnis error vero eos
          accusantium rem nostrum quam numquam nulla, perspiciatis dolorum enim
          saepe. Quas vitae facilis dolor! Assumenda dolor, iste aspernatur
          molestias corrupti sint ratione est soluta ea quia minima consectetur,
          aliquam qui quos quaerat, distinctio error aut dignissimos!
          Reprehenderit vel molestiae ipsum minus laborum dolorum corrupti totam
          a aperiam. Provident temporibus similique labore suscipit impedit,
          itaque earum aut facere voluptatum explicabo minima ut dicta soluta
          eum consequatur saepe inventore accusantium nostrum iste totam.
          Repudiandae blanditiis, minus placeat aliquam voluptate omnis alias
          repellat aut sit id ut doloribus voluptatibus ratione. Sapiente nobis
          earum error exercitationem illo quos provident tempore. Asperiores
          pariatur consequuntur aut illo iusto eligendi ducimus rerum temporibus
          incidunt nostrum porro similique cum vitae, maxime consequatur ipsam
          repellendus ullam suscipit nobis totam officiis. Porro obcaecati
          reprehenderit similique, laudantium eum impedit veniam, ipsam iste
          veritatis ad nostrum optio velit doloribus! Eveniet dolore inventore
          molestias nostrum quae aliquam pariatur. Perferendis sit, doloribus
          temporibus maxime aspernatur eos dolores amet repellat ratione
          exercitationem illum, porro, similique necessitatibus libero
          blanditiis illo. Autem distinctio mollitia fuga provident possimus
          esse quo ea voluptatum repellat quidem exercitationem, unde,
          voluptates fugit veniam nam ipsum? Quidem nemo perferendis maxime
          illum quisquam ipsa alias veritatis dolorem commodi. Harum optio
          quaerat ducimus omnis? Non ducimus maiores omnis quidem soluta amet
          rerum sapiente sit. Hic enim cumque ipsam voluptatibus quo, minus
          nemo. Consequuntur in iste harum dolorum deserunt ratione itaque
          possimus illo quisquam, ipsum ullam quaerat rem esse tempora magni
          ipsa. Atque, explicabo hic officia cupiditate quia doloremque nisi
          labore quo temporibus unde voluptate minima, maiores ab aperiam
          repellendus aut enim. Magni, minus adipisci possimus nesciunt
          reprehenderit incidunt vel debitis temporibus voluptatem eaque
          voluptatum nulla modi, velit recusandae impedit, ipsa praesentium
          minima optio commodi voluptate qui voluptas omnis ducimus accusamus.
          Nobis, voluptatem. Sunt obcaecati possimus enim, nam impedit vel neque
          dignissimos, sit quam ipsa corporis quidem saepe exercitationem nemo
          nesciunt similique ducimus quaerat est autem. Veritatis, commodi ipsa.
          Sunt repellat, exercitationem aliquid, quibusdam quisquam vitae, rerum
          explicabo illo iure voluptate accusantium? Eveniet beatae fugit, eius
          est aut animi consectetur nesciunt eligendi inventore vero magnam
          maiores! Iure, voluptates qui. Nihil, veniam quo non voluptas ea neque
          aliquam dicta? Tenetur asperiores veritatis expedita, facere eaque
          voluptate ab ipsa nulla ipsum aperiam ea nihil quaerat unde magnam
          quia ipsam reiciendis voluptatum totam blanditiis eum harum quibusdam.
          Provident tempore aspernatur consectetur sit nam commodi quibusdam,
          accusantium reiciendis excepturi laudantium, voluptatem labore hic
          deleniti assumenda. Nihil omnis voluptate facilis ea nam dignissimos
          similique cum doloribus adipisci in a, dolor facere atque vel dicta.
          Voluptatem nostrum quae hic officia quam minima. Sint ipsa corporis,
          rem voluptas reiciendis odio numquam distinctio ipsum sit accusamus
          officiis, mollitia nesciunt fugiat minima sed quis autem quod
          obcaecati nulla reprehenderit! Culpa repellat excepturi consectetur
          nulla, assumenda dolores.
        </p>
        <section className="p-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Dolorum, veritatis corrupti? Aperiam
            consequatur veritatis rem voluptates pariatur mollitia id dolore
            quasi itaque libero eligendi sit ullam sed molestias laborum omnis,
            alias eum eius qui perferendis quos tempore? Temporibus rerum
            tempore voluptates repellat vitae magni veniam omnis error vero eos
            accusantium rem nostrum quam numquam nulla, perspiciatis dolorum
            enim saepe. Quas vitae facilis dolor! Assumenda dolor, iste
            aspernatur molestias corrupti sint ratione est soluta ea quia minima
            consectetur, aliquam qui quos quaerat, distinctio error aut
            dignissimos! Reprehenderit vel molestiae ipsum minus laborum dolorum
            corrupti totam a aperiam. Provident temporibus similique labore
            suscipit impedit, itaque earum aut facere voluptatum explicabo
            minima ut dicta soluta eum consequatur saepe inventore accusantium
            nostrum iste totam. Repudiandae blanditiis, minus placeat aliquam
            voluptate omnis alias repellat aut sit id ut doloribus voluptatibus
            ratione. Sapiente nobis earum error exercitationem illo quos
            provident tempore. Asperiores pariatur consequuntur aut illo iusto
            eligendi ducimus rerum temporibus incidunt nostrum porro similique
            cum vitae, maxime consequatur ipsam repellendus ullam suscipit nobis
            totam officiis. Porro obcaecati reprehenderit similique, laudantium
            eum impedit veniam, ipsam iste veritatis ad nostrum optio velit
            doloribus! Eveniet dolore inventore molestias nostrum quae aliquam
            pariatur. Perferendis sit, doloribus temporibus maxime aspernatur
            eos dolores amet repellat ratione exercitationem illum, porro,
            similique necessitatibus libero blanditiis illo. Autem distinctio
            mollitia fuga provident possimus esse quo ea voluptatum repellat
            quidem exercitationem, unde, voluptates fugit veniam nam ipsum?
            Quidem nemo perferendis maxime illum quisquam ipsa alias veritatis
            dolorem commodi. Harum optio quaerat ducimus omnis? Non ducimus
            maiores omnis quidem soluta amet rerum sapiente sit. Hic enim cumque
            ipsam voluptatibus quo, minus nemo. Consequuntur in iste harum
            dolorum deserunt ratione itaque possimus illo quisquam, ipsum ullam
            quaerat rem esse tempora magni ipsa. Atque, explicabo hic officia
            cupiditate quia doloremque nisi labore quo temporibus unde voluptate
            minima, maiores ab aperiam repellendus aut enim. Magni, minus
            adipisci possimus nesciunt reprehenderit incidunt vel debitis
            temporibus voluptatem eaque voluptatum nulla modi, velit recusandae
            impedit, ipsa praesentium minima optio commodi voluptate qui
            voluptas omnis ducimus accusamus. Nobis, voluptatem. Sunt obcaecati
            possimus enim, nam impedit vel neque dignissimos, sit quam ipsa
            corporis quidem saepe exercitationem nemo nesciunt similique ducimus
            quaerat est autem. Veritatis, commodi ipsa. Sunt repellat,
            exercitationem aliquid, quibusdam quisquam vitae, rerum explicabo
            illo iure voluptate accusantium? Eveniet beatae fugit, eius est aut
            animi consectetur nesciunt eligendi inventore vero magnam maiores!
            Iure, voluptates qui. Nihil, veniam quo non voluptas ea neque
            aliquam dicta? Tenetur asperiores veritatis expedita, facere eaque
            voluptate ab ipsa nulla ipsum aperiam ea nihil quaerat unde magnam
            quia ipsam reiciendis voluptatum totam blanditiis eum harum
            quibusdam. Provident tempore aspernatur consectetur sit nam commodi
            quibusdam, accusantium reiciendis excepturi laudantium, voluptatem
            labore hic deleniti assumenda. Nihil omnis voluptate facilis ea nam
            dignissimos similique cum doloribus adipisci in a, dolor facere
            atque vel dicta. Voluptatem nostrum quae hic officia quam minima.
            Sint ipsa corporis, rem voluptas reiciendis odio numquam distinctio
            ipsum sit accusamus officiis, mollitia nesciunt fugiat minima sed
            quis autem quod obcaecati nulla reprehenderit! Culpa repellat
            excepturi consectetur nulla, assumenda dolores.
          </p>
        </section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          odit minus est temporibus laborum architecto! Tenetur illo ea
          molestias perferendis libero ullam eius quidem soluta assumenda
          quisquam quae sequi sint fugiat aspernatur temporibus optio ipsa
          explicabo, fuga officiis? Corporis impedit sapiente ratione facilis
          esse laboriosam, ipsa nulla provident eaque. Iste, eius
          necessitatibus. Quaerat eos voluptatibus explicabo nulla corporis
          culpa ullam minus accusamus et beatae consequatur unde nisi similique
          animi quia adipisci maiores, inventore fuga facere molestiae
          voluptatum quos vitae autem? Dolores, saepe. Quos alias et ad
          reiciendis, dolor hic qui dolorem quas nisi accusamus nesciunt,
          explicabo rerum itaque dignissimos porro! Officiis fugit architecto ad
          iste amet odit nam cum sequi eaque facere earum, enim necessitatibus,
          quasi saepe modi fuga a ratione debitis recusandae, placeat
          repudiandae. Deserunt, soluta consequuntur. Odio quod pariatur quis
          ullam accusamus eos maiores impedit dicta eius esse, atque, quasi
          alias culpa deserunt ea incidunt a hic, tempore consequuntur dolorem
          ut qui eaque! Et ab, beatae in magni dolorum libero quo deserunt
          dolore, veniam excepturi esse vero repellendus amet eos laborum, quod
          laboriosam blanditiis voluptate mollitia enim necessitatibus
          perspiciatis! Neque consequatur accusantium aut error consequuntur
          commodi doloribus minus esse facilis praesentium aperiam dolorem,
          provident voluptates ipsam pariatur fugit.
        </p>
        {/* More sections */}
      </section>
      <section className="p-4"> 
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, itaque!</p>
      </section>
      <section>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, itaque!</p>
      </section>
      <section>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, itaque!</p>
      </section>
      <section>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, itaque!</p>
      </section>
      <section>
        <h2>Experience</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        {/* More sections */}
      </section>
      {/* Add more sections as needed */}
    </div>
  );
};

export default PageBreakTest;
