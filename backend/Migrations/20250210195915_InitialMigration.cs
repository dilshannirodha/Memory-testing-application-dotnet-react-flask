using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UploadedAt",
                table: "UploadedFiles");

            migrationBuilder.RenameColumn(
                name: "FileId",
                table: "UploadedFiles",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "FileType",
                table: "UploadedFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileType",
                table: "UploadedFiles");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UploadedFiles",
                newName: "FileId");

            migrationBuilder.AddColumn<DateTime>(
                name: "UploadedAt",
                table: "UploadedFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
