import axiosApiInstance from "@/api/axiosApiInstance";
export const getDashboardsService = async () => {
    const response = await axiosApiInstance.get('/dashboard');
    return response.data;
};
export const getModulesService = async () => {
    const response = await axiosApiInstance.get('/modules');
    return response.data;
};
//# sourceMappingURL=inSessionServices.js.map