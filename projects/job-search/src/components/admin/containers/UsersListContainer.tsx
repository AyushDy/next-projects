"use client";

import UserFilters from "../filters/UserFilters";
import Pagination from "../../UI/Pagination";
import UsersHeader from "../headers/UsersHeader";
import UsersGrid from "../grids/UsersGrid";
import UsersLoadingState from "../states/UsersLoadingState";
import UsersErrorState from "../states/UsersErrorState";
import UsersEmptyState from "../states/UsersEmptyState";
import { useUsersData } from "../hooks/useUsersData";

export default function UsersListContainer() {
  const {
    users,
    loading,
    error,
    pagination,
    filters,
    handleFilterChange,
    handlePageChange,
    handleDeleteUser,
    refetchUsers,
  } = useUsersData();

  if (loading && users.length === 0) {
    return <UsersLoadingState />;
  }

  if (error) {
    return <UsersErrorState error={error} onRetry={refetchUsers} />;
  }

  const hasActiveFilters = Boolean(filters.search) || filters.role !== "all";

  return (
    <div className="space-y-6">
      <UsersHeader totalUsers={pagination.total} />

      <UserFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        loading={loading}
      />

      {users.length === 0 ? (
        <UsersEmptyState hasFilters={hasActiveFilters} />
      ) : (
        <>
          <UsersGrid users={users} onDeleteUser={handleDeleteUser} />

          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
            />
          )}
        </>
      )}
    </div>
  );
}
