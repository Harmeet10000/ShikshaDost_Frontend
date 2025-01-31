import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Cookies from "js-cookie";
import { Pencil } from "lucide-react";
import { MdDelete } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { useArticles } from "@/context/ArticleContext";
import { fetchArticles } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ManageArticles = () => {
  const queryClient = useQueryClient();
  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const cachedArticles = localStorage.getItem("articles");
      if (cachedArticles) {
        return JSON.parse(cachedArticles);
      }

      const fetchedArticles = await fetchArticles();
      localStorage.setItem("articles", JSON.stringify(fetchedArticles));
      return fetchedArticles;
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });

  const token = Cookies.get("authToken");

  const handleFeatureArticle = async (articleId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/blogs/toggleProminentBlog/${articleId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        // Update localStorage
        const updatedArticles = articles.map((article) =>
          article._id === articleId
            ? { ...article, isProminent: !article.isProminent }
            : article
        );

        localStorage.setItem("articles", JSON.stringify(updatedArticles));

        // Update React Query cache
        queryClient.setQueryData(["articles"], updatedArticles);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteArticle = () => {
    console.log("delete");
  };

  return (
    <section className="articles-table-section p-5">
      <h1 className="pl-3 text-xl font-bold mb-2">Articles Management</h1>

      {/* Conditional Rendering for Loading and Error States */}
      {isLoading && <div className="p-5">Loading articles...</div>}
      {isError && (
        <div className="p-5 text-red-500">Failed to load articles.</div>
      )}

      {/* Render the table only if data is loaded and no error */}
      {!isLoading && !isError && (
        <Table>
          <TableCaption>A list of articles</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sr. No.</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Prominent</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article, index) => (
              <TableRow key={article._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.isFeatured ? "Yes" : "No"}</TableCell>
                <TableCell>{article.isProminent ? "Yes" : "No"}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => handleFeatureArticle(article._id)}
                      >
                        <Pencil className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Feature this article</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  |
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger onClick={handleDeleteArticle}>
                        <MdDelete />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete this article</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Articles</TableCell>
              <TableCell className="text-right">{articles.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </section>
  );
};

export default ManageArticles;
