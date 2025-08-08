"use client";

import { useState, useEffect } from "react";
import {
  UserWithStats,
  UserFilters,
  PaginationData,
  UsersApiResponse,
} from "../types/userTypes";
import axios from "axios";

export function useUsersData() {
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const [filters, setFilters] = useState<UserFilters>({
    search: "",
    role: "all",
    page: 1,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const searchParams = new URLSearchParams({
        page: filters.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.role !== "all" && { role: filters.role }),
      });

      const response = await fetch(`/api/admin/users?${searchParams}`);
      const data: UsersApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      if (data.success) {
        setUsers(data.data.users);
        setPagination(data.data.pagination);
      } else {
        throw new Error(data.message || "Failed to fetch users");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<UserFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page:
        newFilters.search !== undefined || newFilters.role !== undefined
          ? 1
          : prev.page,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleDeleteUser = async (userId: string) => {
    const url = `/api/admin/users/${userId}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      fetchUsers();
    }
  };

  const refetchUsers = () => {
    fetchUsers();
  };

  return {
    users,
    loading,
    error,
    pagination,
    filters,
    handleFilterChange,
    handlePageChange,
    handleDeleteUser,
    refetchUsers,
  };
}
